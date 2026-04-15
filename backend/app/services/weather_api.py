import httpx
from datetime import datetime
from typing import Optional, Dict, Any
from app.schemas.weather import WeatherData

class WeatherService:
    @staticmethod
    def normalize_openweathermap(data: Dict[str, Any]) -> WeatherData:
        """
        Normalizes OpenWeatherMap API response to our standardized format.
        """
        # Extract rainfall - OpenWeatherMap might not include 'rain' key if no rain
        rainfall = 0.0
        if "rain" in data:
            rainfall = data["rain"].get("1h", data["rain"].get("3h", 0.0))
        
        return WeatherData(
            temperature=data["main"]["temp"],
            humidity=data["main"]["humidity"],
            wind_speed=data["wind"]["speed"],
            rainfall=float(rainfall),
            source="api",
            timestamp=datetime.fromtimestamp(data["dt"])
        )

    @staticmethod
    def normalize_weatherapi(data: Dict[str, Any]) -> WeatherData:
        """
        Normalizes WeatherAPI.com response to our standardized format.
        """
        current = data["current"]
        return WeatherData(
            temperature=current["temp_c"],
            humidity=current["humidity"],
            wind_speed=current["wind_kph"] / 3.6,  # Convert kph to m/s
            rainfall=current["precip_mm"],
            source="api",
            timestamp=datetime.fromtimestamp(current["last_updated_epoch"])
        )

class WeatherFetcher:
    def __init__(self, openweather_key: Optional[str] = None, weatherapi_key: Optional[str] = None):
        self.openweather_key = openweather_key
        self.weatherapi_key = weatherapi_key

    async def fetch_openweathermap(self, city: str) -> WeatherData:
        if not self.openweather_key:
            raise ValueError("OpenWeatherMap API Key is missing")
        
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={self.openweather_key}&units=metric"
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json()
            return WeatherService.normalize_openweathermap(data)

    async def fetch_weatherapi(self, city: str) -> WeatherData:
        if not self.weatherapi_key:
            raise ValueError("WeatherAPI Key is missing")
        
        url = f"https://api.weatherapi.com/v1/current.json?key={self.weatherapi_key}&q={city}"
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json()
            return WeatherService.normalize_weatherapi(data)
