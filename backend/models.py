from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class Category(BaseModel):
    id: int
    title: str
    description: str
    parent_category_id: int
    created_at: Optional[datetime]
    last_updated_at : Optional[datetime]

    class Config:
        orm_mode = True