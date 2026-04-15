from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.schemas.weather import WeatherCreate, WeatherRead
from app.models.weather import WeatherData
from datetime import datetime

from app.services.weather_api import WeatherFetcher
from app.core.config import settings

router = APIRouter()

# Initialize fetcher with keys from settings
weather_fetcher = WeatherFetcher(
    openweather_key=settings.OPENWEATHER_API_KEY
)

@router.get("/weather", response_model=WeatherRead)
async def get_current_weather(city: str = "London"):
    """
    Fetches the latest weather data.
    Order of preference:
    1. Fresh IoT data (within last 15 minutes)
    2. Real-time API data (if IoT is stale or missing)
    """
    # Try finding recent IoT data
    latest_iot = await WeatherData.find(
        WeatherData.source == "iot"
    ).sort("-timestamp").first_or_none()
    
    # If IoT data is fresh (within 15 mins), return it
    if latest_iot and (datetime.utcnow() - latest_iot.timestamp).total_seconds() < 900:
        return latest_iot
    
    # Fallback to API if IoT is stale or non-existent
    try:
        api_data = await weather_fetcher.fetch_openweathermap(city)
        # Store API fetch in history
        weather_entry = WeatherData(**api_data.dict())
        await weather_entry.insert()
        return weather_entry
    except Exception as e:
        # If API fails but we have stale IoT data, return that as last resort
        if latest_iot:
            return latest_iot
        raise HTTPException(status_code=503, detail=f"Weather service unavailable: {str(e)}")

@router.get("/forecast")
async def get_weather_forecast():
    """
    Returns AI-predicted forecast using the LSTM model (Member 3 logic).
    """
    # Placeholder for AI prediction logic
    return {
        "prediction": "Partly Cloudy",
        "predicted_temp": 28.5,
        "confidence": 0.85,
        "source": "ai_model"
    }

@router.post("/sensor-data", response_model=WeatherRead, status_code=201)
async def post_sensor_data(data: WeatherCreate):
    """
    Endpoint for IoT hardware (ESP8266/ESP32) to send sensor data.
    """
    # Force source to iot if coming to this endpoint
    weather_entry = WeatherData(**data.dict())
    weather_entry.source = "iot"
    await weather_entry.insert()
    return weather_entry

@router.post("/chat")
async def chat_with_assistant(query: dict):
    """
    Proxy endpoint for the NLP chatbot (Member 3 logic).
    """
    user_message = query.get("message")
    if not user_message:
        raise HTTPException(status_code=400, detail="Message is required")
    
    # Placeholder for NLP logic
    return {
        "reply": f"You asked: '{user_message}'. I'm currently processing this via the NLP module.",
        "intent": "general_info"
    }
