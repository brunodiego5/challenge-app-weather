from fastapi import APIRouter

from app.model.City import City
from app.schema.CitySchema import CitySchema

router = APIRouter()

@router.get("/", response_model=City)
def index():
    city = City()
    city.name = "Guararapes2"
    city.weather.temperature = 32


    return city