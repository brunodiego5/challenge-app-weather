import requests

class OpenWeatherMapService:

    @staticmethod
    def getWeather(cityName = ""):
        response = requests.get(f"http://api.openweathermap.org/data/2.5/weather?q={cityName}&appid=92e34d7b6a1f0f906b27622b1b2cdddd&units=metric")

        return response