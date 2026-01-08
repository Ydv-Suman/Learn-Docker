from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Annotated, List, Optional
import sys
import os

# Add parent directory to path for imports
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, parent_dir)

import database
import model

router = APIRouter()

db_dependency = Annotated[Session, Depends(database.get_db)]

# Pydantic models for request/response
class ItemCreate(BaseModel):
    name: str
    description: Optional[str] = None


class ItemResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True


@router.post("/items", response_model=ItemResponse, status_code=201)
def add_item(item: ItemCreate, db: db_dependency):
    """Add a new item"""
    db_item = model.Item(name=item.name, description=item.description)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.delete("/items/{item_id}", status_code=204)
def delete_item(item_id: int, db: db_dependency):
    """Delete an item by ID"""
    db_item = db.query(model.Item).filter(model.Item.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return None


@router.get("/items", response_model=List[ItemResponse])
def get_all_items(db: db_dependency):
    """Get all items"""
    items = db.query(model.Item).all()
    return items


@router.get("/items/{item_id}", response_model=ItemResponse)
def get_item(item_id: int, db: db_dependency):
    """Get a specific item by ID"""
    db_item = db.query(model.Item).filter(model.Item.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

