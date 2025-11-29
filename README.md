# Docker

---

# 🐳 Docker Commands Reference

A complete guide to the most essential Docker and Docker Compose commands.
Use this README as a cheat sheet or documentation for any Docker-based project.

---

# 📘 Table of Contents

1. [Installation & Basics](#installation--basics)
2. [Images](#images)
3. [Containers](#containers)
4. [Dockerfile Commands](#dockerfile-commands)
5. [Networks](#networks)
6. [Volumes](#volumes)
7. [Logs & Debugging](#logs--debugging)
8. [Docker Compose](#docker-compose)
9. [Cleanup Commands](#cleanup-commands)
10. [Registry & Publishing](#registry--publishing)
11. [Swarm Mode (Optional)](#swarm-mode-optional)
12. [Useful Shortcuts](#useful-shortcuts)

---

# 🧩 Installation & Basics

### Check Docker version

```bash
docker --version
```

### Check Docker Compose version

```bash
docker compose version
```

### Verify Docker is running

```bash
docker info
```

---

# 📦 Images

### List images

```bash
docker images
```

### Search for images on Docker Hub

```bash
docker search <keyword>
```

### Pull image

```bash
docker pull <image>:<tag>
```

### Build image from Dockerfile

```bash
docker build -t myimage .
```

### Tag image

```bash
docker tag <source> <target>
```

### Remove image

```bash
docker rmi <image>
```

### Remove unused images

```bash
docker image prune
docker image prune -a
```

---

# 🧱 Containers

### List running containers

```bash
docker ps
```

### List all containers

```bash
docker ps -a
```

### Run container

```bash
docker run <image>
```

### Run in background (detached)

```bash
docker run -d <image>
```

### Run with port mapping

```bash
docker run -p 8080:80 <image>
```

### Run with environment variables

```bash
docker run -e VAR=value <image>
```

### Run with env file

```bash
docker run --env-file .env <image>
```

### Run with a mounted volume

```bash
docker run -v myvolume:/data <image>
```

### Start / Stop containers

```bash
docker start <container>
docker stop <container>
```

### Restart container

```bash
docker restart <container>
```

### Remove container

```bash
docker rm <container>
```

### Remove all stopped containers

```bash
docker container prune
```

### Execute commands inside a container

```bash
docker exec -it <container> sh
```

### Container logs

```bash
docker logs <container>
```

---

# 🛠 Dockerfile Commands

A quick overview of the most common Dockerfile instructions:

| Command      | Description                                |
| ------------ | ------------------------------------------ |
| `FROM`       | Base image                                 |
| `RUN`        | Execute commands during image build        |
| `COPY`       | Copy files to the container                |
| `ADD`        | Copy files (supports URLs, tar extraction) |
| `WORKDIR`    | Set working directory                      |
| `CMD`        | Default command when container runs        |
| `ENTRYPOINT` | Entry command (not overridden easily)      |
| `EXPOSE`     | Document port usage                        |
| `ENV`        | Set environment variables                  |
| `VOLUME`     | Define volumes                             |
| `USER`       | Set user                                   |
| `LABEL`      | Add metadata                               |
| `ARG`        | Build-time variables                       |

---

# 🌐 Networks

### List networks

```bash
docker network ls
```

### Create a network

```bash
docker network create mynetwork
```

### Remove network

```bash
docker network rm mynetwork
```

### Inspect network

```bash
docker network inspect mynetwork
```

---

# 💾 Volumes

### List volumes

```bash
docker volume ls
```

### Create a volume

```bash
docker volume create myvolume
```

### Remove a volume

```bash
docker volume rm myvolume
```

### Remove unused volumes

```bash
docker volume prune
```

---

# 🔍 Logs & Debugging

### Follow live logs

```bash
docker logs -f <container>
```

### Show container processes

```bash
docker top <container>
```

### Inspect container or image metadata

```bash
docker inspect <container|image>
```

---

# 🧬 Docker Compose

### Start all services

```bash
docker compose up
```

### Start in background

```bash
docker compose up -d
```

### Stop services

```bash
docker compose down
```

### Rebuild containers

```bash
docker compose build
```

### View Compose services

```bash
docker compose ps
```

### View logs

```bash
docker compose logs -f
```

### Run a one-off command

```bash
docker compose run <service> <command>
```

### Remove everything (containers, networks, volumes)

```bash
docker compose down --rmi all --volumes
```

---

# 🧹 Cleanup Commands

### Remove everything unused

```bash
docker system prune
```

### Max cleanup (images, containers, networks, volumes)

```bash
docker system prune -a --volumes
```

---

# 📤 Registry & Publishing

### Login to Docker registry

```bash
docker login
```

### Tag image

```bash
docker tag myimage username/myimage:latest
```

### Push image

```bash
docker push username/myimage:latest
```

### Pull image

```bash
docker pull username/myimage:latest
```

---

# ⚓ Swarm Mode (Optional)

### Initialize Swarm

```bash
docker swarm init
```

### Join a worker node

Output from init includes token; then:

```bash
docker swarm join --token <token> <manager-ip>:2377
```

### Deploy stack

```bash
docker stack deploy -c docker-compose.yml mystack
```

### List services

```bash
docker service ls
```

### Remove stack

```bash
docker stack rm mystack
```

---

# ⏱ Useful Shortcuts

### Stop all running containers

```bash
docker stop $(docker ps -q)
```

### Remove all containers

```bash
docker rm $(docker ps -aq)
```

### Remove all images

```bash
docker rmi $(docker images -q)
```

### Free space (dry run)

```bash
docker system df
```
