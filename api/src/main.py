from fastapi import FastAPI

from app.controller import CityController

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

app.include_router(CityController.router, prefix="/citys", tags=["citys"])