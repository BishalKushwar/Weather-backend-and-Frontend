import React, { useState } from "react";
import { server } from "./server.js";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const getWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${server}/weather?city=${city}`);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError(null);
      } else {
        setError(data.message || "Something went wrong");
        setWeather(null);
      }
    } catch (err) {
      setError("Error fetching weather data");
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h1>Weather App </h1>
      <form onSubmit={getWeather}>
        <input
          type="text"
          name="city"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <p>
            <i className="fas fa-thermometer-half"></i>
            {weather.main.temp}&deg;F
          </p>
          <p>
            <i className="fas fa-cloud"></i>
            {weather.weather[0].main}
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i>
            {weather.name}, {weather.sys.country}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
