# Smart Weather Assistant (Phase 1)

AI-Powered Smart Weather Forecasting & Assistant (Phase 1 – API-Based, IoT-Ready).

## Objective
Build a modular full-stack weather forecasting system that uses APIs for data in Phase 1 and seamlessly integrates IoT hardware in Phase 2. Includes AI prediction (Deep Learning) and chatbot interaction (NLP).

## Tech Stack
- **Backend:** FastAPI
- **Frontend:** React
- **Database:** MongoDB Atlas
- **AI/ML:** TensorFlow (LSTM), Hugging Face (NLP)
- **APIs:** OpenWeatherMap / WeatherAPI

## Team Structure
- **Team Head/Backend:** @C3Gowdacq
- **API Engineer:** Member 1
- **AI Engineer:** Member 3
- **Frontend Developer:** Member 4

## Project Structure
- `/backend`: FastAPI source code and API endpoints.
- `/frontend`: React dashboard.
- `/ai`: LSTM models and NLP components.

## Phase 2 Compatibility
The system is designed with a **Service-Repository pattern**. IoT sensor data can be ingested via `POST /sensor-data` without redesigning the core system.
