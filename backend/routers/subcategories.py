from fastapi import APIRouter, status, HTTPException
from typing import List
from database import SessionLocal
from models_db import Category_DB
from models import Category

router = APIRouter(
    prefix="/subcategories",
    tags=["subcategories"],
    responses={
        404: {"description": "Not found"},
        200: {"description": "Success"},
        500: {"description": "Internal Server Error"},
    },
)

# To get the list of immediate sub-categories of the category with id = category_id
@router.get('/{category_id}', response_model=List[Category])
def get_all_sub_categories(category_id: int):
    db = SessionLocal()
    category = db.query(Category_DB).filter(Category_DB.id == category_id).first()
    if category:
        subcategories = db.query(Category_DB).filter(Category_DB.parent_category_id == category.id).all()
        return subcategories
    else:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, detail=f"Category with ID : {category_id} not Found in the database")

# To delete all the sub-categories of the category with id = category_id
@router.delete('/{category_id}')
def delete_all_sub_categories(category_id: int):
    db = SessionLocal()
    category = db.query(Category_DB).filter(Category_DB.id == category_id).first()
    if category:
        subCategories = db.query(Category_DB).filter(Category_DB.parent_category_id == category.id).all()
        for subCategory in subCategories:
            db.delete(subCategory)
        db.commit()
        return {"detail" : f"SubCategories of Parent ID : {category_id} Deleted Successfully!"}
    else:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, detail=f"Category with ID : {category_id} not Found in the database")