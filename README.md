# Learn-Docker

Docker examples for learning containerization with Python applications.

## 📁 Project Structure

```
Learn-Docker/
├── calculator/          # Flask calculator application
├── Flood_Prediction/    # Streamlit flood prediction ML application
└── deploy_on_EC2/      # FastAPI + React full-stack application
```

---

## 🐳 Calculator Application

### Build Image
```bash
docker build -t calculator-app ./calculator
```

### Run Container
```bash
docker run -d -p 8000:8000 --name calculator-container calculator-app
```

### Container Management
```bash
docker ps                          # View running containers
docker ps -a                       # View all containers
docker stop calculator-container   # Stop container
docker start calculator-container  # Start container
docker rm calculator-container     # Remove container
docker logs calculator-container   # View logs
docker logs -f calculator-container # Follow logs
docker exec -it calculator-container /bin/bash  # Access shell
```

**Access:** http://localhost:8000

---

## 🐳 Flood Prediction Application

### Build Image
```bash
docker build -t flood-prediction-app ./Flood_Prediction
```

### Run Container
```bash
docker run -d -p 8501:8501 --name flood-prediction-container flood-prediction-app
```

### Container Management
```bash
docker stop flood-prediction-container
docker rm flood-prediction-container
docker logs flood-prediction-container
```

**Access:** http://localhost:8501

---

## 🐳 FastAPI + React Application (deploy_on_EC2)

### Using Docker Compose (Recommended)
```bash
cd deploy_on_EC2
docker-compose up --build
docker-compose down                # Stop containers
```

**Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Run Containers Separately

**Backend:**
```bash
cd deploy_on_EC2/backend
docker build -t sumanydv/ec2-backend .
docker run -p 8000:8000 sumanydv/ec2-backend
```

**Frontend:**
```bash
cd deploy_on_EC2/frontend
docker build -t ec2-frontend .
docker run -p 5173:5173 -e VITE_API_TARGET=http://host.docker.internal:8000 ec2-frontend
```

### Push to Docker Hub
```bash
# Backend
cd deploy_on_EC2/backend
docker build -t sumanydv/ec2-backend .
docker push sumanydv/ec2-backend

# Frontend
cd deploy_on_EC2/frontend
docker build -t sumanydv/ec2-frontend .
docker push sumanydv/ec2-frontend
```

---

## 🗑️ Image Management

```bash
docker images                      # List all images
docker rmi <image-name>            # Remove image
docker image prune -a              # Remove all unused images
```

---

## 🧹 Cleanup

```bash
docker container prune             # Remove all stopped containers
docker system prune -a            # Remove all unused resources
```

---

## 🔍 Useful Commands

```bash
docker logs -f <container-name>                    # Follow logs
docker exec -it <container-name> <command>         # Execute command
docker inspect <container-name>                    # Inspect container
docker stats                                       # View resource usage
docker cp <container-name>:<path> <host-path>      # Copy from container
docker cp <host-path> <container-name>:<path>      # Copy to container
```
