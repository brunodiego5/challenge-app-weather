import requests

response = requests.get("http://api.openweathermap.org/data/2.5/weather?q=guararapes&appid=92e34d7b6a1f0f906b27622b1b2cdddd&units=metric")

print(response.text)