from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal

class WeatherBase(BaseModel):
    temperature: float = Field(..., description="Temperature in Celsius")
    humidity: float = Field(..., description="Humidity percentage")
    wind_speed: float = Field(..., description="Wind speed in m/s")
    rainfall: float = Field(..., description="Rainfall in mm")
    source: Literal["api", "iot"] = Field(..., description="Source of the data")
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class WeatherCreate(WeatherBase):
    pass

class WeatherRead(WeatherBase):
    id: str = Field(None, alias="_id")

    class Config:
        populate_by_name = True
