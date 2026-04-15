const BASE_URL = 'http://localhost:8000/api/v1';

export const weatherAPI = {
  getCurrentWeather: async (city = 'London') => {
    const response = await fetch(`${BASE_URL}/weather?city=${city}`);
    if (!response.ok) throw new Error('Failed to fetch current weather');
    return response.json();
  },

  getForecast: async () => {
    const response = await fetch(`${BASE_URL}/forecast`);
    if (!response.ok) throw new Error('Failed to fetch forecast');
    return response.json();
  },

  sendMessage: async (message) => {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  }
};
