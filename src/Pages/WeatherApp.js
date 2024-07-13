import React, { useState, useEffect } from "react";
import "./Styles/WeatherApp.css";

const WeatherApp = () => {
  //#region State Variables

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  //#endregion

  //#region Fetch Weather Data

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const fetchWeatherData = async () => {
    if (!position) {
      setError("Please enter Latitude and Longitude");
    } else {
      try {
        setLoading(true); // Set loading to true when fetching starts
        setWeatherData(null); // Reset weather data
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${position.latitude}&lon=${position.longitude}&appid=86080ce89af1747c4d56032316460148`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    }
  };

  //#endregion

  //#region Event Handlers

  const handleFetchWeather = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const handleFetchWeatherDefault = () => {
    setPosition({
      latitude: 20.593683,
      longitude: 78.962883,
      accuracy: 100,
    });
  };

  //#endregion

  //#region JSX

  return (
    <div>
      <h1>Weather App</h1>
      {position && (
        <p>
          Your current coords:
          {position.latitude} {position.longitude}
        </p>
      )}
      {error && <p className="error">{error}</p>}
      <button
        className="default-button"
        type="button"
        onClick={handleFetchWeatherDefault}
      >
        Use default
      </button>
      <br />
      <br />
      <form className="weatherInput">
        <label>Latitude:</label>
        <input
          value={position.latitude}
          type="number"
          required
          onChange={(e) => setPosition({ latitude: e.target.value })}
        />
        <label>Longitude:</label>
        <input
          value={position.longitude}
          type="number"
          required
          onChange={(e) => setPosition({ longitude: e.target.value })}
        />
        <button type="submit" onClick={handleFetchWeather}>
          Fetch Weather
        </button>
      </form>

      {loading && (
        <div className="loading">
          <h1>Fetching...</h1>
        </div>
      )}

      {weatherData && (
        <div>
          <h2>Weather Forecast for {weatherData.city.name}</h2>
          <table className="weatherTable">
            <thead>
              <tr>
                <th>Date and Time</th>
                <th>Temperature (Kelvin)</th>
                <th>Description</th>
                <th>Humidity (%)</th>
                <th>Wind Speed (m/s)</th>
              </tr>
            </thead>
            <tbody>
              {weatherData.list.map((forecast, index) => (
                <tr key={index}>
                  <td>{forecast.dt_txt}</td>
                  <td>{forecast.main.temp}</td>
                  <td>{forecast.weather[0].description}</td>
                  <td>{forecast.main.humidity}</td>
                  <td>{forecast.wind.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  //#endregion
};

export default WeatherApp;
