import React, { useState } from "react";
import "./Movie.css";

const Movie = ({ title, releaseDate, overview, posterPath }) => {
  const [showModal, setShowModal] = useState(false);

  const truncateOverview = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="movie-container">
      <div className="movie">
        {posterPath && (
          <img
            src={`https://image.tmdb.org/t/p/w185/${posterPath}`}
            alt={title}
          />
        )}
        <div className="movie-details">
          <h3>{title}</h3>
          <p>Release Date: {releaseDate}</p>
          <p>{truncateOverview(overview, 150)}</p>
          <button onClick={() => setShowModal(true)}>Read More</button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <h3>{title}</h3>
          <p>Release Date: {releaseDate}</p>
          <p>{overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w300/${posterPath}`}
            alt={title}
          />
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Movie;
