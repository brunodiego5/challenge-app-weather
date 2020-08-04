from fastapi import APIRouter

from app.model.City import City
from app.schema.CitySchema import CitySchema
from app.services.openweathermap import OpenWeatherMapService

router = APIRouter()

@router.get("/bycity/", response_model=City)
def getWeatherByCityName(cityName: str):
    city = City()
    city.name = cityName
    
    response = OpenWeatherMapService.getWeatherByCityName(cityName)
    temperature = response.json()['main']['temp'] 
    temperature = temperature + (1 if temperature % int(temperature) else 0)
    
    city.weather.temperature = temperature
    
    return city

@router.get("/bylatlon/", response_model=City)
def getWeatherByLatLon(lat: float, lon: float):
    response = OpenWeatherMapService.getWeatherByLatLon(lat, lon)
    data = response.json()

    city = City()
    city.name = data['name']
    temperature = data['main']['temp'] 
    temperature = temperature + (1 if temperature % int(temperature) else 0)
    
    city.weather.temperature = temperature
    
    return city    