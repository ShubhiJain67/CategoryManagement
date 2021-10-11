from datetime import datetime
from pydantic import BaseModel

class Category(BaseModel):
    id: int
    title: str
    description: str
    parent_category_id: int
    # created_at: datetime
    # updated_last_at : datetime

    class Config:
        orm_mode = True