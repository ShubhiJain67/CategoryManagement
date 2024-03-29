from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import categories as CategoryRouter, categories_root as RootRouter, categories_subcategories as SubCategoryRouter, categories_parent as ParentRouter

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(CategoryRouter.router)
app.include_router(RootRouter.router)
app.include_router(SubCategoryRouter.router)
app.include_router(ParentRouter.router)