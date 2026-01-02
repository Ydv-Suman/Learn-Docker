from fastapi import FastAPI  # pyright: ignore[reportMissingImports]
from fastapi.middleware.cors import CORSMiddleware  # pyright: ignore[reportMissingImports]
from pydantic import BaseModel  # pyright: ignore[reportMissingImports]
from typing import List

app = FastAPI(title="Simple FastAPI Backend", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://frontend:5173",  # Docker container name
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Item(BaseModel):
    id: int
    name: str
    description: str = ""

class ItemCreate(BaseModel):
    name: str
    description: str = ""

# In-memory storage (replace with database in production)
items_db = [
    {"id": 1, "name": "Item 1", "description": "First item"},
    {"id": 2, "name": "Item 2", "description": "Second item"},
]

# Routes
@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Backend!", "status": "running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "FastAPI Backend"}

@app.get("/api/items", response_model=List[Item])
async def get_items():
    return items_db

@app.get("/api/items/{item_id}", response_model=Item)
async def get_item(item_id: int):
    item = next((item for item in items_db if item["id"] == item_id), None)
    if item is None:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.post("/api/items", response_model=Item)
async def create_item(item: ItemCreate):
    new_id = max([item["id"] for item in items_db], default=0) + 1
    new_item = {"id": new_id, "name": item.name, "description": item.description}
    items_db.append(new_item)
    return new_item

@app.delete("/api/items/{item_id}")
async def delete_item(item_id: int):
    global items_db
    item = next((item for item in items_db if item["id"] == item_id), None)
    if item is None:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Item not found")
    items_db = [item for item in items_db if item["id"] != item_id]
    return {"message": "Item deleted successfully"}

if __name__ == "__main__":
    import uvicorn  # pyright: ignore[reportMissingImports]
    uvicorn.run(app, host="0.0.0.0", port=8000)

