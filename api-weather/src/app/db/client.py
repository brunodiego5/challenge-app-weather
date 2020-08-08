from pymongo import MongoClient
import app.config.database as config

client = MongoClient(config.MONGO_URL)
db = client.weather
