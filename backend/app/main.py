from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.api.v1.endpoints import router as api_router
from app.models.weather import WeatherData

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

@app.on_event("startup")
async def startup_event():
    # Initialize Beanie with the WeatherData document
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    await init_beanie(
        database=client[settings.DATABASE_NAME],
        document_models=[WeatherData]
    )

@app.get("/")
def read_root():
    return {"message": "Welcome to the Smart Weather Assistant API", "status": "running"}

# Include the API versioned router
app.include_router(api_router, prefix=settings.API_V1_STR)
