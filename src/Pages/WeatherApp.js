import React, { useState } from "react";
import "./Styles/WeatherApp.css";

const WeatherApp = () => {
  //#region State Variables

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //#endregion

  //#region Fetch Weather Data

  const fetchWeatherData = async () => {
    if (!lat || !lon) {
      setError("Please enter Latitude and Longitude");
    } else {
      try {
        setLoading(true); // Set loading to true when fetching starts
        setWeatherData(null); // Reset weather data
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=86080ce89af1747c4d56032316460148`
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
    setLat(20.593683);
    setLon(78.962883);
  };

  //#endregion

  //#region JSX

  return (
    <div>
      <h1>Weather App</h1>
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
          value={lat}
          type="number"
          required
          onChange={(e) => setLat(e.target.value)}
        />
        <label>Longitude:</label>
        <input
          value={lon}
          type="number"
          required
          onChange={(e) => setLon(e.target.value)}
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
