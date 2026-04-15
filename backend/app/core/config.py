from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Smart Weather Assistant"
    API_V1_STR: str = "/api/v1"
    
    # MongoDB Atlas
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "weather_db"
    
    # External APIs
    OPENWEATHER_API_KEY: Optional[str] = None
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
