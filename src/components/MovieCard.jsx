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
            <style>{`
        .movie-card {
          display: block;
          transition: transform 0.3s ease;
        }
        .movie-card:hover {
          transform: scale(1.05);
        }
        .card-inner {
          background: var(--card-bg);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .poster-wrapper {
          position: relative;
          aspect-ratio: 2/3;
          overflow: hidden;
        }
        .poster-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .movie-card:hover .poster-wrapper img {
          transform: scale(1.1);
          filter: brightness(0.7);
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .movie-card:hover .overlay {
          opacity: 1;
        }
        .play-icon {
          font-size: 3rem;
          color: white;
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
          transform: scale(0.8);
          transition: transform 0.3s ease;
        }
        .movie-card:hover .play-icon {
          transform: scale(1);
        }
        .info {
          padding: 15px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .info h3 {
          font-size: 1.1rem;
          margin-bottom: 5px;
          color: var(--text-color);
          font-weight: 600;
        }
        .info .year {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
      `}</style>
        </Link>
    );
};

export default MovieCard;
