from fastapi import APIRouter, status, HTTPException
from typing import List
from database import SessionLocal
from models_db import Category_DB
from models import Category

db = SessionLocal()

router = APIRouter(
    prefix="/tree",
    tags=["tree"],
    responses={
        404: {"description": "Not found"},
        200: {"description": "Success"},
        500: {"description": "Internal Server Error"},
    },
)

# To get the list of immediate sub-categories of the category with id = category_id
@router.get('/{category_id}', response_model=List[Category])
def get_category_tree(category_id: int):
    category = db.query(Category_DB).filter(Category_DB.id == category_id).first()
    subcategories = db.query(Category_DB).filter(Category_DB.parent_category_id == category.id).all()
    result = []
    result.append(subcategories)
    return result
    # if category:
    #     result = [] 
    #     queue = [category]
    #     tempQueue = []
        # while queue.count > 0:
        #     queue_length = queue.count
        #     curr_index = 0
        #     while(curr_index < queue_length):
        #         curr_category = queue[curr_index]
        #         subcategories = db.query(Category_DB).filter(Category_DB.parent_category_id == curr_category.id).all()
        #         tempQueue.append(subcategories)
        #         print(subcategories)
        #         curr_index += 1
        #     result.append(tempQueue)
        #     queue.clear()
        #     queue.append(tempQueue)
        #     tempQueue.clear()
    #     curr_index = 0
    #     while(curr_index < queue.count):
    #         print("____________________________________")
    #         curr_category = queue[curr_index]
    #         subcategories = db.query(Category_DB).filter(Category_DB.parent_category_id == curr_category.id).all()
    #         queue.append(subcategories)
    #         curr_index = curr_index + 1
    #     return queue
    # else:
    #     raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, detail=f"Category with ID : {category_id} not Found in the database")