# Learn-Docker

This repository contains Docker examples for learning containerization with Python applications.

## 📁 Project Structure

```
Learn-Docker/
├── calculator/          # Flask calculator application
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
└── Flood_Prediction/    # Streamlit flood prediction ML application
    ├── app.py
    ├── Dockerfile
    ├── requirements.txt
    └── Flood_prediction.pkl
```

---

## 🐳 Docker Commands

### Calculator Application

#### 1. Build Docker Image

```bash
docker build -t calculator-app ./calculator
```

**Explanation:**

- `docker build` - Command to build a Docker image from a Dockerfile
- `-t calculator-app` - Tags the image with the name "calculator-app" (makes it easier to reference later)
- `./calculator` - Specifies the build context (directory containing the Dockerfile and application files)

#### 2. Run Docker Container

```bash
docker run -d -p 8000:8000 --name calculator-container calculator-app
```

**Explanation:**

- `docker run` - Command to create and start a new container from an image
- `-d` - Runs the container in detached mode (in the background)
- `-p 8000:8000` - Maps port 8000 from the host machine to port 8000 in the container (host:container format)
- `--name calculator-container` - Assigns a custom name "calculator-container" to the container
- `calculator-app` - The image name to run

#### 3. View Running Containers

```bash
docker ps
```

**Explanation:**

- `docker ps` - Lists all currently running containers
- Shows container ID, image name, status, ports, and names

#### 4. View All Containers (Including Stopped)

```bash
docker ps -a
```

**Explanation:**

- `docker ps -a` - Lists all containers, including stopped ones
- `-a` - Flag for "all" containers

#### 5. Stop Container

```bash
docker stop calculator-container
```

**Explanation:**

- `docker stop` - Gracefully stops a running container
- `calculator-container` - The name or ID of the container to stop

#### 6. Start Stopped Container

```bash
docker start calculator-container
```

**Explanation:**

- `docker start` - Starts a previously stopped container
- `calculator-container` - The name or ID of the container to start

#### 7. Remove Container

```bash
docker rm calculator-container
```

**Explanation:**

- `docker rm` - Removes a stopped container
- `calculator-container` - The name or ID of the container to remove
- Note: Container must be stopped before removal (or use `-f` flag to force remove)

#### 8. View Container Logs

```bash
docker logs calculator-container
```

**Explanation:**

- `docker logs` - Displays the logs/output from a container
- `calculator-container` - The name or ID of the container
- Use `-f` flag to follow logs in real-time: `docker logs -f calculator-container`

#### 9. Access Container Shell

```bash
docker exec -it calculator-container /bin/bash
```

**Explanation:**

- `docker exec` - Executes a command in a running container
- `-it` - Interactive terminal flag (allows you to interact with the container)
- `calculator-container` - The name or ID of the container
- `/bin/bash` - The command to execute (opens a bash shell)

---

### Flood Prediction Application

#### 1. Build Docker Image

```bash
docker build -t flood-prediction-app ./Flood_Prediction
```

**Explanation:**

- `docker build` - Command to build a Docker image from a Dockerfile
- `-t flood-prediction-app` - Tags the image with the name "flood-prediction-app"
- `./Flood_Prediction` - Specifies the build context (directory containing the Dockerfile and application files)

#### 2. Run Docker Container

```bash
docker run -d -p 8501:8501 --name flood-prediction-container flood-prediction-app
```

**Explanation:**

- `docker run` - Command to create and start a new container from an image
- `-d` - Runs the container in detached mode (in the background)
- `-p 8501:8501` - Maps port 8501 from the host machine to port 8501 in the container (Streamlit default port)
- `--name flood-prediction-container` - Assigns a custom name to the container
- `flood-prediction-app` - The image name to run

#### 3. Stop Container

```bash
docker stop flood-prediction-container
```

**Explanation:**

- `docker stop` - Gracefully stops a running container
- `flood-prediction-container` - The name or ID of the container to stop

#### 4. Remove Container

```bash
docker rm flood-prediction-container
```

**Explanation:**

- `docker rm` - Removes a stopped container
- `flood-prediction-container` - The name or ID of the container to remove

---

## 🗑️ Image Management Commands

#### 1. List All Docker Images

```bash
docker images
```

**Explanation:**

- `docker images` - Lists all Docker images stored locally
- Shows image repository, tag, image ID, creation date, and size

#### 2. Remove Docker Image

```bash
docker rmi calculator-app
```

**Explanation:**

- `docker rmi` - Removes a Docker image (note: "rmi" stands for "remove image")
- `calculator-app` - The image name or ID to remove
- Note: All containers using this image must be removed first

#### 3. Remove All Unused Images

```bash
docker image prune -a
```

**Explanation:**

- `docker image prune` - Removes unused images
- `-a` - Removes all images not associated with a container (not just dangling images)

---

## 🧹 Cleanup Commands

#### 1. Remove All Stopped Containers

```bash
docker container prune
```

**Explanation:**

- `docker container prune` - Removes all stopped containers
- Prompts for confirmation before deletion

#### 2. Remove All Unused Resources

```bash
docker system prune -a
```

**Explanation:**

- `docker system prune` - Removes all unused containers, networks, images, and build cache
- `-a` - Also removes all unused images, not just dangling ones
- Use with caution as it removes all unused Docker resources

---

## 📝 Quick Reference

### Calculator App

- **Port:** 8000
- **Access:** http://localhost:8000
- **Build:** `docker build -t calculator-app ./calculator`
- **Run:** `docker run -d -p 8000:8000 --name calculator-container calculator-app`

### Flood Prediction App

- **Port:** 8501
- **Access:** http://localhost:8501
- **Build:** `docker build -t flood-prediction-app ./Flood_Prediction`
- **Run:** `docker run -d -p 8501:8501 --name flood-prediction-container flood-prediction-app`

---

## 🔍 Useful Tips

1. **View real-time logs:** `docker logs -f <container-name>`
2. **Execute commands in container:** `docker exec -it <container-name> <command>`
3. **Inspect container details:** `docker inspect <container-name>`
4. **View resource usage:** `docker stats`
5. **Copy files from container:** `docker cp <container-name>:<path> <host-path>`
6. **Copy files to container:** `docker cp <host-path> <container-name>:<path>`
