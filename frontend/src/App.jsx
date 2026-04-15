import React, { useState, useEffect } from 'react';
import SideNav from './components/SideNav';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import ChatAssistant from './components/ChatAssistant';
import { weatherAPI } from './services/api';

function App() {
  const [activeCity, setActiveCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (city) => {
    setLoading(true);
    try {
      const weather = await weatherAPI.getCurrentWeather(city);
      const forecast = await weatherAPI.getForecast();
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeCity);
    // Poll every 5 minutes
    const interval = setInterval(() => fetchData(activeCity), 300000);
    return () => clearInterval(interval);
  }, [activeCity]);

  return (
    <div className="app-container">
      <SideNav 
        activeCity={activeCity} 
        onCitySelect={(city) => setActiveCity(city)} 
      />

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Weather Dashboard</h1>
          <p>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </header>

        <div className="dashboard-grid">
          <div className="col-left">
            <WeatherCard data={weatherData} loading={loading} />
            <ForecastCard data={forecastData} />
          </div>
          
          <div className="col-right">
            <ChatAssistant />
          </div>
        </div>
      </main>

      <style jsx>{`
        .main-content {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          overflow-y: auto;
        }
        .dashboard-header h1 {
          font-size: 2.5rem;
          margin-bottom: 4px;
        }
        .dashboard-header p {
          color: var(--text-dim);
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          flex: 1;
        }
        .col-left {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .col-right {
          height: 100%;
        }

        @media (max-width: 1200px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          .col-right {
            height: 500px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
