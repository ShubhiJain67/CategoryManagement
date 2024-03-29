from sqlalchemy.sql.expression import false, true
from models import Category, Category_v2
from typing import List
from fastapi import APIRouter, status, HTTPException
from database import SessionLocal
from models_db import Category_DB
from random import randint
import datetime

db = SessionLocal()

router = APIRouter(
    prefix="/categories",
    tags=["categories"],
    responses={
        404: {"description": "Not found"},
        200: {"description": "Success"},
        500: {"description": "Internal Server Error"},
    },
)

# To get a list of all the categories
@router.get('/', response_model=List[Category])
def get_all_categories():
    categories = db.query(Category_DB).all()
    return categories

# To get the details of the category with the id = category_id
@router.get('/{category_id}', response_model=Category)
def get_category(category_id: int):
    category = db.query(Category_DB).filter(Category_DB.id == category_id).first()
    return category

# To add a new category
@router.post('/', response_model=Category)
def add_category(title: str, description:str):
    target_category = db.query(Category_DB).filter(Category_DB.title == title).first()
    if target_category:
        raise HTTPException(status_code= status.HTTP_400_BAD_REQUEST, detail=f"Category with the same title already exists in the database")
    else:
        new_category = Category_DB(
            id = randint(0,100000),
            title = title,
            description = description,
            parent_category_id = -1,
            created_at = datetime.datetime.now(),
            last_updated_at = datetime.datetime.now()
        )
        db.add(new_category)
        db.commit()
        return new_category

# To add a new sub-category to the category with id = category_id
@router.post('/{parent_category_id}', response_model=Category)
def add_sub_category(parent_category_id: str, title: str, description:str):
    target_category = db.query(Category_DB).filter(Category_DB.title == title).first()
    if target_category:
        raise HTTPException(status_code= status.HTTP_400_BAD_REQUEST, detail=f"Category with the same title already exists in the database")
    else:
        new_category = Category_DB(
            id = randint(0, 1000000),
            title = title,
            description = description,
            parent_category_id = parent_category_id,
            created_at = datetime.datetime.now(),
            last_updated_at = datetime.datetime.now()
        )
        db.add(new_category)
        db.commit()
        return new_category

# To update the category with id = category_id
@router.put('/{category_id}', response_model=Category)
def update_category(category_id: int, updated_category: Category_v2):
    target_category = db.query(Category_DB).filter(Category_DB.title == updated_category.title).filter(Category_DB.id != category_id).first()
    if target_category:
        raise HTTPException(status_code= status.HTTP_400_BAD_REQUEST, detail=f"Category with the same title already exists in the database")
    else:
        if is_parent_child_of_category(category_id, updated_category.parent_category_id):
            raise HTTPException(status_code= status.HTTP_400_BAD_REQUEST, detail=f"Parent Category cannot have it's Sub Category as its Parent")
        else:
            category = db.query(Category_DB).filter(Category_DB.id == category_id).first()
            if category:
                category.title = updated_category.title
                category.description = updated_category.description
                category.parent_category_id = updated_category.parent_category_id
                category.last_updated_at = datetime.datetime.now()
                db.commit()
                return category
            else:
                raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, detail=f"Category with ID : {category_id} not Found in the database")

def is_parent_child_of_category(category_id: int, parent_id: int):
    parent = db.query(Category_DB).filter(Category_DB.id == parent_id).first()
    while parent.parent_category_id != -1:
        if parent.parent_category_id == category_id:
            return true
        parent = db.query(Category_DB).filter(Category_DB.id == parent.parent_category_id).first()
    return false

# To delete the category with id = category_id
@router.delete('/{category_id}')
def delete_category(category_id: int):
    category = db.query(Category_DB).filter(Category_DB.id == category_id).first()
    if category:
        subCategories = db.query(Category_DB).filter(Category_DB.id == category.parent_category_id).all()
        db.delete(category)
        for subCategory in subCategories:
            subCategory.parent_category_id = -1
        db.commit()
        return {"detail" : f"Category with ID : {category_id} Deleted Successfully!"}
    else:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, detail=f"Category with ID : {category_id} not Found in the database")