from sqlalchemy.sql.sqltypes import TIMESTAMP
from database import Base
from sqlalchemy import String, Integer, Column, Text, TIMESTAMP

class Category_DB(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False, unique=True)
    description = Column(Text)
    parent_category_id = Column(Integer)
    # created_at = Column(TIMESTAMP)
    # last_updated_at = Column(TIMESTAMP)

    def __repr__(self):
        return f"category ID : {self.id} Name : {self.title} Description = {self.description} Parent ID = {self.parent_category_id}"