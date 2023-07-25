import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ErrorModal from "./Errormodal";
import Weather from "./Weather";

function App() {
  const [cityName, setCityName] = useState("");
  const [result, setResult] = useState(null);
  const [mapURL, setMapURL] = useState(null);
  const [error, setError] = useState(null);
  const [forecasts, setForecasts] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    getLocationDetails(cityName);

    setCityName("");
  };

  const handleMap = (latitude, longitude) => {
    const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${latitude},${longitude}&zoom=9`;
    setMapURL(API);
  };

  const getLocationDetails = async (cityName) => {
    const apiUrl = `https://eu1.locationiq.com/v1/search?key=${
      process.env.REACT_APP_API_KEY
    }&q=${encodeURIComponent(cityName)}&format=json`;

    try {
      const response = await axios.get(apiUrl);
      const result = response.data[0];

      const latitude = result.lat;
      const longitude = result.lon;
      const displayName = result.display_name;

      setResult({
        displayName,
        latitude,
        longitude,
      });

      handleMap(latitude, longitude);

      try {
        const weatherResponse = await axios.get(
          `http://localhost:8080/weather?lat=${latitude}&lon=${longitude}&searchQuery=${cityName}`
        );

        setForecasts(weatherResponse.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setForecasts([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult(null);
      setMapURL(null);
      setError({
        errorCode: error.response ? error.response.status : null,
        errorMessage: error.message,
      });
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div className="cityform">
      <h1>City Explorer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Enter a city:
          <input
            type="text"
            required
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <button type="submit">Explore!</button>
      </form>

      <div>
        {result && (
          <div className="results">
            <h2>Result:</h2>
            <p>City: {result?.displayName}</p>
            <p>Latitude: {result?.latitude}</p>
            <p>Longitude: {result?.longitude}</p>
            {mapURL && <img className="map" src={mapURL} alt="Location Map" />}
          </div>
        )}
      </div>

      {forecasts !== null && forecasts.length > 0 ? (
        <Weather city={result?.displayName} forecasts={forecasts} />
      ) : (
        forecasts !== null && (
          <div className="weather-data">
            <p>No weather data available for {result?.displayName}</p>
          </div>
        )
      )}

      {error && (
        <ErrorModal
          errorCode={error.errorCode}
          errorMessage={error.errorMessage}
          onClose={handleCloseError}
        />
      )}
    </div>
  );
}

export default App;
