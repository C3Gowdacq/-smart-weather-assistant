import React from 'react';

const ForecastCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="glass-card forecast-card">
      <h3>AI Prediction</h3>
      <div className="prediction-content">
        <div className="prediction-main">
          <h2>{data.prediction}</h2>
          <p>Confidence: {(data.confidence * 100).toFixed(0)}%</p>
        </div>
        <div className="prediction-temp">
          <h3>{data.predicted_temp}°C</h3>
          <p>Expected</p>
        </div>
      </div>

      <style jsx>{`
        .forecast-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .prediction-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .prediction-main h2 {
          color: var(--accent-cyan);
        }
        .prediction-main p {
          font-size: 0.8rem;
          color: var(--text-dim);
        }
        .prediction-temp h3 {
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default ForecastCard;
