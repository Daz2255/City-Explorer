import React from "react";

const Movie = ({ title, releaseDate, overview, posterPath }) => {
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
          <p>{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
