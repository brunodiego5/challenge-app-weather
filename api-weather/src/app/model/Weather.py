from pydantic import BaseModel

class Weather(BaseModel):
    temperature: int = 0