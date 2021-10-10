from pydantic import BaseModel

class Category(BaseModel):
    id: int
    title: str
    description: str
    parent_category_id: int

    class Config:
        orm_mode = True