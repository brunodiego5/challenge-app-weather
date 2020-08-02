from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.controller import CityController

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

app.include_router(CityController.router, prefix="/citys", tags=["citys"])