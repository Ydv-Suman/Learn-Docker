# FastAPI + React Application

A simple full-stack application with FastAPI backend and React frontend.

## Project Structure

```
deploy_on_EC2/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── venv/                # Virtual environment (optional)
└── frontend/
    ├── src/
    │   ├── App.jsx          # Main React component
    │   └── main.jsx         # React entry point
    ├── package.json         # Node dependencies
    └── vite.config.js       # Vite configuration
```

## Backend Setup (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (if not already created):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```bash
   python main.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

The backend will be available at `http://localhost:8000`

API Documentation (Swagger UI): `http://localhost:8000/docs`

## Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/items` - Get all items
- `GET /api/items/{item_id}` - Get a specific item
- `POST /api/items` - Create a new item
- `DELETE /api/items/{item_id}` - Delete an item

## Features

- ✅ FastAPI backend with CORS enabled
- ✅ React frontend with Vite
- ✅ CRUD operations for items
- ✅ Health check endpoint
- ✅ Auto-generated API documentation
- ✅ Modern UI with error handling

## Docker Setup

### Using Docker Compose (Recommended)

1. From the `deploy_on_EC2` directory, run:
   ```bash
   docker-compose up --build
   ```

2. The application will be available at:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8000`
   - API Docs: `http://localhost:8000/docs`

3. To stop the containers:
   ```bash
   docker-compose down
   ```

### Running Containers Separately

If you need to run containers separately:

1. **Backend:**
   ```bash
   cd backend
   docker build -t sumanydv/ec2-backend .
   docker run -p 8000:8000 sumanydv/ec2-backend
   ```

2. **Frontend:**
   ```bash
   cd frontend
   docker build -t ec2-frontend .
   docker run -p 5173:5173 -e VITE_API_TARGET=http://host.docker.internal:8000 ec2-frontend
   ```
   
   Note: On Mac/Windows, use `host.docker.internal` to access the host machine's localhost. On Linux, you may need to use the host's IP address.

### Pushing to Docker Hub

1. **Backend:**
   ```bash
   cd backend
   docker build -t sumanydv/ec2-backend .
   docker push sumanydv/ec2-backend
   ```

2. **Frontend:**
   ```bash
   cd frontend
   docker build -t sumanydv/ec2-frontend .
   docker push sumanydv/ec2-frontend
   ```

## Development Notes

- The Vite proxy is configured to forward `/api` requests to the backend
- In Docker, containers communicate via the service names (backend/frontend)
- For local development, the proxy uses `http://localhost:8000`
- CORS is configured to allow requests from the frontend
- The backend uses in-memory storage (replace with a database for production)

