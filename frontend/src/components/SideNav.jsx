import React from 'react';

const SideNav = ({ onCitySelect, activeCity }) => {
  const cities = ["London", "New York", "Tokyo", "Bangalore", "Dubai"];

  return (
    <div className="glass-card side-nav">
      <div className="brand">
        <div className="brand-icon"></div>
        <h2>WeatherAI</h2>
      </div>

      <div className="nav-items">
        <p className="nav-label">Locations</p>
        <div className="city-list">
          {cities.map(city => (
            <button 
              key={city}
              className={`city-btn ${activeCity === city ? 'active' : ''}`}
              onClick={() => onCitySelect(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className="nav-footer">
        <p>Phase 1 (Production)</p>
        <p className="status">System Online</p>
      </div>

      <style jsx>{`
        .side-nav {
          width: 280px;
          height: calc(100vh - 40px);
          margin: 20px;
          display: flex;
          flex-direction: column;
          padding: 32px;
          gap: 40px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-violet));
          border-radius: 8px;
        }
        .nav-label {
          font-size: 0.75rem;
          color: var(--text-dim);
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .city-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .city-btn {
          background: none;
          border: 1px solid transparent;
          color: var(--text-dim);
          text-align: left;
          padding: 12px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .city-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }
        .city-btn.active {
          background: var(--gl-bg);
          border-color: var(--gl-border);
          color: white;
          font-weight: 600;
        }
        .nav-footer {
          margin-top: auto;
          font-size: 0.8rem;
          color: var(--text-dim);
        }
        .status {
          color: #4caf50;
          font-weight: 600;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
};

export default SideNav;
