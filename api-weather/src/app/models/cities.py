from pydantic import BaseModel
from app.db.client import db
import pprint

class City(BaseModel):
    country: str = ""
    id: int = 0
    name: str = ""

    @staticmethod
    def find_one(id: int):
        cities = db['cities']
        city = cities.find_one({"id": id})
        return city

    @staticmethod
    def find(name: str = ""):
        if (name == ""):    
            return []

        cities = db['cities']
        query = { "name": { 
            "$regex": f'^{name}',
            "$options" :'i'
            } 
        }
        results = cities.find(query).limit(5)
        return list(results)
