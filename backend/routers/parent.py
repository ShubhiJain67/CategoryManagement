from fastapi import APIRouter, status, HTTPException
from database import SessionLocal
from models_db import Category_DB
from models import Category

db = SessionLocal()

router = APIRouter(
    prefix="/parent",
    tags=["parent"],
    responses={
        404: {"description": "Not found"},
        200: {"description": "Success"},
        500: {"description": "Internal Server Error"},
    },
)

# To get the immediate parent category of the sub-category with id = category_id
@router.get('/{category_id}', response_model=Category)
def get_category_parent(category_id: int):
    subcategory = db.query(Category_DB).filter(Category_DB.id == category_id).first()
    if subcategory:
        if subcategory.parent_category_id == -1:
            return {"id": -1, "title": 'Root', "description": '', "parent_category_id": -1}
        else:
            category = db.query(Category_DB).filter(Category_DB.id == subcategory.parent_category_id).first()
            if category:
                return category
            else:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Parent Category of the given Category with ID {category_id} not found")