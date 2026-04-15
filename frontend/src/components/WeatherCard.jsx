import React from 'react';

const WeatherCard = ({ data, loading }) => {
  if (loading) return <div className="glass-card weather-main-card loading">Loading Weather...</div>;
  if (!data) return null;

  return (
    <div className="glass-card weather-main-card">
      <div className="card-header">
        <span className={`badge ${data.source}`}>{data.source} source</span>
        <p className="timestamp">{new Date(data.timestamp).toLocaleTimeString()}</p>
      </div>
      
      <div className="weather-stats">
        <div className="main-temp">
          <h1>{data.temperature.toFixed(1)}°C</h1>
          <p>Current Temperature</p>
        </div>
        
        <div className="metrics-grid">
          <div className="metric">
            <span className="label">Humidity</span>
            <h3>{data.humidity}%</h3>
          </div>
          <div className="metric">
            <span className="label">Wind</span>
            <h3>{data.wind_speed.toFixed(1)} m/s</h3>
          </div>
          <div className="metric">
            <span className="label">Rainfall</span>
            <h3>{data.rainfall.toFixed(1)} mm</h3>
          </div>
        </div>
      </div>

      <style jsx>{`
        .weather-main-card {
          padding: 32px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .timestamp {
          font-size: 0.8rem;
          color: var(--text-dim);
        }
        .main-temp h1 {
          font-size: 4rem;
          margin-bottom: 8px;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--gl-border);
        }
        .metric .label {
          font-size: 0.75rem;
          color: var(--text-dim);
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

export default WeatherCard;
