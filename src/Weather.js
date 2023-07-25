import React from "react";

function Weather({ city, forecasts }) {
  return (
    <div>
      <h2>Weather Forecast for {city}</h2>
      {forecasts.length === 0 ? (
        <p>No weather data available for {city}</p>
      ) : (
        forecasts.map((forecast) => (
          <div key={forecast.date}>
            <p>Date: {forecast.date}</p>
            <p>Description: {forecast.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Weather;
