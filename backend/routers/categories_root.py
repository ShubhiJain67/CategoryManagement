from fastapi import APIRouter, status, HTTPException
from typing import List
from database import SessionLocal
from models_db import Category_DB
from models import Category

router = APIRouter(
    prefix="/categories/root",
    tags=["root"],
    responses={
        404: {"description": "Not found"},
        200: {"description": "Success"},
        500: {"description": "Internal Server Error"},
    },
)

# To get a list of all the root categories
@router.get('/', response_model=List[Category])
def get_all_root_categories():
    db = SessionLocal()
    root_categories = db.query(Category_DB).filter(Category_DB.parent_category_id == -1).all()
    return root_categories

# To get the root category of the category with id = category_id
@router.get('/{category_id}', response_model=Category)
def get_root_category(category_id: int):
    db = SessionLocal()
    category = db.query(Category_DB).filter(Category_DB.id == category_id).first()
    if category:
        while category.parent_category_id != -1:
            category = db.query(Category_DB).filter(Category_DB.id == category.parent_category_id).first()
        return category
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Category with the given ID {category_id} not found")