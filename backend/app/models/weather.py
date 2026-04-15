from datetime import datetime
from typing import Literal
from beanie import Document
from pydantic import Field

class WeatherData(Document):
    temperature: float
    humidity: float
    wind_speed: float
    rainfall: float
    source: Literal["api", "iot"]
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "weather_history"
