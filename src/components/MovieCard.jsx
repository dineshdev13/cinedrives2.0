import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="card-inner">
        <div className="poster-wrapper">
          <img src={movie.posterUrl} alt={movie.title} loading="lazy" />
          <div className="overlay">
            <span className="play-icon">▶</span>
          </div>
        </div>
        <div className="info">
          <h3>{movie.title}</h3>
          <span className="year">{movie.year}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
