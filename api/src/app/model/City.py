from pydantic import BaseModel

from .Weather import Weather

class City(BaseModel):
    name: str = ""
    weather: Weather = Weather()
    