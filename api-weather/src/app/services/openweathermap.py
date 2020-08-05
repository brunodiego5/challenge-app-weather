import requests

class OpenWeatherMapService:

    @staticmethod
    def read_weather_city(city = ""):
        response = requests.get(f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid=92e34d7b6a1f0f906b27622b1b2cdddd&units=metric")
      
        return response
    
    @staticmethod
    def read_weather_geo(lat = 0, lon = 0):
        response = requests.get(f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=92e34d7b6a1f0f906b27622b1b2cdddd&units=metric")
      
        return response

        