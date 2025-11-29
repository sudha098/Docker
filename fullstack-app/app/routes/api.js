const express = require('express');
const router = express.Router();

let pool, redisClient;

const initRoutes = (dbPool, redisCli) => {
  pool = dbPool;
  redisClient = redisCli;
};

router.get('/users', async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const cacheKey = `users:all:${limit}`;
    
    let users = await redisClient.get(cacheKey);
    
    if (!users) {
      const result = await pool.query(
        'SELECT id, name, email, created_at FROM users ORDER BY created_at DESC LIMIT $1',
        [limit]
      );
      users = JSON.stringify(result.rows);
      await redisClient.setEx(cacheKey, 300, users);
    }
    
    res.json({
      success: true,
      data: JSON.parse(users),
      cacheHit: !!users
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email required' });
    }

    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    
    await redisClient.del('users:all');
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ success: false, error: 'Email already exists' });
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) as total_users FROM users');
    res.json({
      success: true,
      data: {
        totalUsers: parseInt(result.rows[0].total_users),
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = { router, initRoutes };
