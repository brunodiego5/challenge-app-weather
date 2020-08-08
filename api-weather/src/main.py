from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.endpoints import weather
from app.endpoints import cities

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(weather.router, prefix="/weather", tags=["weather"])
app.include_router(cities.router, prefix="/cities", tags=["cities"])