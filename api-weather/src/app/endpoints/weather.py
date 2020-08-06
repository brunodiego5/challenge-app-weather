from fastapi import APIRouter
from requests import Response

from app.models.weather import Weather
from app.services.openweathermap import OpenWeatherMapService

router = APIRouter()

@router.get("/city", response_model=Weather)
def read_weather_city(name: str):
    response = OpenWeatherMapService.read_weather_city(name)
    
    return response_data(response)

@router.get("/geo", response_model=Weather)
def read_weather_geo(lat: float, lon: float):
    response = OpenWeatherMapService.read_weather_geo(lat, lon)
    
    return response_data(response)

def response_data(response: Response):
    weather = Weather()
    
    if response.status_code != 200:
        return weather

    data = response.json()
    weather.city = data['name']
    temp = data['main']['temp'] 
    weather.temperature = temp + (1 if temp % int(temp) else 0)
    weather.description = data['weather'][0]['description']
    weather.currently = data['weather'][0]['main']
    weather.date = data['dt']


    return weather
