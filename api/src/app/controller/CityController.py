from fastapi import APIRouter

from app.model.City import City

router = APIRouter()

@router.get("/")
def index():
    city = City()
    city.name = "Guararapes2"

    return city