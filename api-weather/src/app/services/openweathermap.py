import requests

class OpenWeatherMapService:

    @staticmethod
    def getWeatherByCityName(cityName = ""):
        response = requests.get(f"http://api.openweathermap.org/data/2.5/weather?q={cityName}&appid=92e34d7b6a1f0f906b27622b1b2cdddd&units=metric")
      
        return response
    
    @staticmethod
    def getWeatherByLatLon(lat = 0, lon = 0):
        response = requests.get(f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=92e34d7b6a1f0f906b27622b1b2cdddd&units=metric")
      
        return response

        