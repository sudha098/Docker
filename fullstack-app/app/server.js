const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const { Pool } = require('pg');
const { createClient } = require('redis');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// Initial health endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'initializing', timestamp: new Date().toISOString() });
});

let pool, redisClient;

async function initializeServices() {
  try {
    console.log('🔄 Initializing services...');
    
    redisClient = createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' });
    redisClient.on('error', (err) => console.error('Redis Error:', err));
    await redisClient.connect();
    console.log('✅ Redis connected');

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    await pool.query('SELECT 1');
    console.log('✅ Postgres connected');

    apiRoutes.initRoutes(pool, redisClient);

    app.get('/health', async (req, res) => {
      try {
        await pool.query('SELECT 1');
        await redisClient.ping();
        res.json({ status: 'healthy', timestamp: new Date().toISOString() });
      } catch (error) {
        res.status(503).json({ status: 'unhealthy', error: error.message });
      }
    });

    console.log(`🚀 App fully running on port ${PORT}`);
  } catch (error) {
    console.error('❌ Init failed:', error);
    app.get('/health', (req, res) => {
      res.status(503).json({ status: 'failed', error: error.message });
    });
  }
}

app.listen(PORT, () => {
  console.log(`🌱 Server listening on port ${PORT}`);
  initializeServices().catch(console.error);
});
