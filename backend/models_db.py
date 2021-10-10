from database import Base
from sqlalchemy import String, Integer, Column, Text

class Category_DB(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True)
    description = Column(Text)
    parent_category_id = Column(Integer)

    def __repr__(self):
        return f"category ID : {self.id} Name : {self.name} Description = {self.description} Parent ID = {self.parent_category_id}"