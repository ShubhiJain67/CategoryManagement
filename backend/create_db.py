from database import Base, engine
from models_db import Category_DB

print("Creating Database ...")

Base.metadata.create_all(engine)