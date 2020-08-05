from pydantic import BaseModel

class Weather(BaseModel):
    city: str = ""
    temperature: int = 0