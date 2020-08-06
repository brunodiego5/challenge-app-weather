from pydantic import BaseModel

class Weather(BaseModel):
    city: str = ""
    temperature: int = 0
    description = ""
    currently = ""
    date: int = 0