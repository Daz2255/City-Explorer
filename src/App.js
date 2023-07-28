import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ErrorModal from "./Errormodal";
import Weather from "./Weather";
import Movie from "./Movies";

function App() {
  const [cityName, setCityName] = useState("");
  const [result, setResult] = useState(null);
  const [mapURL, setMapURL] = useState(null);
  const [error, setError] = useState(null);
  const [forecasts, setForecasts] = useState(null);
  const [movies, setMovies] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const locationResponse = await axios.get(
        `https://eu1.locationiq.com/v1/search?key=${
          process.env.REACT_APP_API_KEY
        }&q=${encodeURIComponent(cityName)}&format=json`
      );
      const result = locationResponse.data[0];

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
          `https://city-exp-api.onrender.com/weather?lat=${latitude}&lon=${longitude}&searchQuery=${cityName}`
        );

        setForecasts(weatherResponse.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setForecasts([]);
      }

      const movieResponse = await axios.get(
        `https://city-exp-api.onrender.com/movies?city=${encodeURIComponent(
          cityName
        )}`
      );

      const moviesWithImages = movieResponse.data.filter(
        (movie) => movie.posterPath
      );

      setMovies(moviesWithImages);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult(null);
      setMapURL(null);
      setError({
        errorCode: error.response ? error.response.status : null,
        errorMessage: error.message,
      });

      setForecasts(null);
      setMovies(null);
    }

    setCityName("");
  };

  const handleMap = (latitude, longitude) => {
    const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${latitude},${longitude}&zoom=9`;
    setMapURL(API);
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div className="cityform">
      <div className="cityform-header">
        <h1>City Explorer</h1>
        <form onSubmit={handleSubmit}>
          <div className="cityform-input">
            <input
              type="text"
              required
              value={cityName}
              placeholder="Enter a city"
              onChange={(e) => setCityName(e.target.value)}
            />
          </div>
        </form>
        <button
          className="pill-btn"
          type="submit"
          form="cityform"
          onClick={handleSubmit}
        >
          Explore!
        </button>
      </div>
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

      {result && forecasts !== null && forecasts.length > 0 && (
        <div className="weather-data">
          <Weather city={result?.displayName} forecasts={forecasts} />
        </div>
      )}

      {movies !== null && movies.length > 0 ? (
        <div className="movies-container">
          <h2>Movies about {result?.displayName}</h2>
          <div className="movies">
            {movies.map((movie, index) => (
              <Movie
                key={index}
                title={movie.title}
                releaseDate={movie.releaseDate}
                overview={movie.overview}
                posterPath={movie.posterPath}
              />
            ))}
          </div>
        </div>
      ) : (
        movies !== null && (
          <div className="movies">
            <p>No movies found for {result?.displayName}</p>
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
