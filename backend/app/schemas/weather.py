from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal

class WeatherData(BaseModel):
    """
    Standardized weather data schema for both API and IoT sources.
    This ensures Phase 2 compatibility.
    """
    temperature: float = Field(..., description="Temperature in Celsius")
    humidity: float = Field(..., description="Humidity percentage")
    wind_speed: float = Field(..., description="Wind speed in m/s")
    rainfall: float = Field(..., description="Rainfall in mm")
    source: Literal["api", "iot"] = Field(..., description="Source of the data")
    timestamp: datetime = Field(default_factory=datetime.now, description="Time of data collection")

    model_config = {
        "json_schema_extra": {
            "example": {
                "temperature": 25.5,
                "humidity": 60.0,
                "wind_speed": 5.2,
                "rainfall": 0.0,
                "source": "api",
                "timestamp": "2023-10-27T10:00:00"
            }
        }
    }
