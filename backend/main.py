from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Category

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# To get a list of all the categories
@app.get('/categories')
def get_all_categories():
    pass

# To get the details of the category with the id = category_id
@app.get('/categories/{category_id}')
def get_category(category_id: int):
    pass

# To add a new category
@app.post('/categories')
def add_category(category: Category):
    pass

# To add a new sub-category to the category with id = category_id
@app.post('/categories/{category_id}')
def add_sub_category(category_id: int, category: Category):
    pass

# To update the category with id = category_id
@app.put('/categories/{category_id}')
def update_category(category_id: int, category: Category):
    pass

# To delete the category with id = category_id
@app.delete('/categories/{category_id}')
def delete_category(category_id: int):
    pass

# To get the list of immediate sub-categories of the category with id = category_id
@app.get('/children/{category_id}')
def get_all_sub_categories(category_id: id):
    pass

# To delete all the sub-categories of the category with id = category_id
@app.get('/children/{category_id}')
def delete_all_sub_categories(category_id: id):
    pass

# To get a list of all the root categories
@app.get('/root')
def get_all_root_categories():
    pass

# To get the root category of the category with id = category_id
@app.get('/root/{category_id}')
def get_root_category(category_id: int):
    pass

# To get the immediate category of the sub-category with id = category_id
@app.get('/parent/{category_id}')
def get_category_parent(category_id: int):
    pass

# To get the path of the category with the id = category_id from the root category
@app.get('/path/{category_id}')
def get_category_path(category_id: int):
    pass