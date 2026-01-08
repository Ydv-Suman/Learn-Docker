from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.app import router
import database
import os
from fastapi import FastAPI

app = FastAPI(title="Item Management API")

# Configure CORS to allow frontend requests
origins = os.getenv("ORIGINS")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
def startup_event():
    database.init_db()

# Include routes
app.include_router(router, prefix="/api", tags=["items"])


@app.get("/")
def read_root():
    return {"message": "Welcome to Item Management API"}
