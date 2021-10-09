from database import Base, engine
from models_db import Category

print("Creating Database ...")

Base.metadata.create_all(engine)