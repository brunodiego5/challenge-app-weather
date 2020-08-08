from typing import List

from fastapi import APIRouter
from requests import Response

from app.models.cities import City

router = APIRouter()

@router.get("/{id}", response_model=City)
def read_city_by_id(id: int):
    city = City.find_one(id)
    return city

@router.get("", response_model=List[City])
def read_cities_by_name(name: str):
    cities = City.find(name)
    return cities