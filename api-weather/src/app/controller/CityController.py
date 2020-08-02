from fastapi import APIRouter

from app.model.City import City
from app.schema.CitySchema import CitySchema
from app.services.openweathermap import OpenWeatherMapService

router = APIRouter()

@router.get("/", response_model=City)
def store(cityName: str):
    city = City()
    city.name = cityName
    
    response = OpenWeatherMapService.getWeather(cityName)
    temperature = response.json()['main']['temp'] 
    temperature = temperature + (1 if temperature % int(temperature) else 0)
    
    city.weather.temperature = temperature
    
    return city