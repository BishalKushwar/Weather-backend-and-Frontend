"use client";
import React, { useState, useEffect } from "react";
import { Wind, Droplets, Thermometer, MapPin, Search, Sun, Cloud, CloudRain } from "lucide-react";

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("recentSearches");
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    }
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setError(null);
  };

  const addToRecentSearches = (cityName) => {
    const updated = [cityName, ...recentSearches.filter(c => c !== cityName)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return <Sun className="w-12 h-12 text-yellow-400" />;
      case 'clouds':
        return <Cloud className="w-12 h-12 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-12 h-12 text-blue-400" />;
      default:
        return <Cloud className="w-12 h-12 text-gray-400" />;
    }
  };

  const getWeather = async (searchCity) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/weather?city=${searchCity || city}`);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
        setError(null);
        addToRecentSearches(searchCity || city);
      } else {
        setError(data.message || "City not found");
        setWeather(null);
      }
    } catch (err) {
      setError("Error fetching weather data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    getWeather();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Weather App</h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              name="city"
              value={city}
              onChange={handleInputChange}
              placeholder="Enter city name"
              className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {recentSearches.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-400 mb-2">Recent Searches:</h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((searchCity) => (
                <button
                  key={searchCity}
                  onClick={() => {
                    setCity(searchCity);
                    getWeather(searchCity);
                  }}
                  className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors duration-200"
                >
                  {searchCity}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-900 border-l-4 border-red-500 text-red-300 p-4 mb-4 rounded-lg">
            {error}
          </div>
        )}

        {weather && (
          <div className="bg-gray-700 rounded-xl p-6 text-white">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-1">{weather.name}</h2>
                <p className="flex items-center gap-1 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  {weather.sys.country}
                </p>
              </div>
              {getWeatherIcon(weather.weather[0].main)}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400">Temperature</span>
                </div>
                <p className="text-2xl font-bold">{Math.round(weather.main.temp)}°F</p>
                <p className="text-sm text-gray-400">Feels like: {Math.round(weather.main.feels_like)}°F</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400">Humidity</span>
                </div>
                <p className="text-2xl font-bold">{weather.main.humidity}%</p>
                <p className="text-sm text-gray-400">{weather.weather[0].description}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400">Wind</span>
                </div>
                <p className="text-2xl font-bold">{Math.round(weather.wind.speed)} mph</p>
                <p className="text-sm text-gray-400">Direction: {weather.wind.deg}°</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400">Min/Max</span>
                </div>
                <p className="text-xl font-bold">
                  {Math.round(weather.main.temp_min)}°F / {Math.round(weather.main.temp_max)}°F
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}