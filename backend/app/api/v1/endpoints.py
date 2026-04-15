from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.schemas.weather import WeatherCreate, WeatherRead
from app.models.weather import WeatherData
from datetime import datetime

router = APIRouter()

@router.get("/weather", response_model=WeatherRead)
async def get_current_weather():
    """
    Fetches the latest weather data (prefers IoT if available, else API).
    """
    latest = await WeatherData.find_all().sort("-timestamp").first_or_none()
    if not latest:
        raise HTTPException(status_code=404, detail="No weather data found")
    return latest

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
