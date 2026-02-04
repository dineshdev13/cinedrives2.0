import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movies } from '../data/movies';

const MovieDetails = () => {
    const { id } = useParams();
    const movie = movies.find(m => m.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!movie) {
        return <div className="container" style={{ paddingTop: '50px' }}>Movie not found.</div>;
    }

    return (
        <div className="details-page fade-in">
            <div className="backdrop">
                <div className="backdrop-image" style={{ backgroundImage: `url(${movie.posterUrl})` }}></div>
                <div className="backdrop-overlay"></div>
            </div>

            <div className="content container">
                <Link to="/" className="back-btn">← Back to Movies</Link>

                <div className="details-grid">
                    <div className="poster-col">
                        <img src={movie.posterUrl} alt={movie.title} className="main-poster" />
                    </div>

                    <div className="info-col">
                        <h1>{movie.title}</h1>
                        <div className="meta">
                            <span className="year">{movie.year}</span>
                            <span className="dot">•</span>
                            <span className="genre">{movie.genre}</span>
                        </div>

                        <p className="description">{movie.description}</p>

                        <div className="cast-section">
                            <h3>Starring</h3>
                            <p>{movie.cast}</p>
                        </div>

                        <a href={movie.downloadLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary download-btn">
                            Download (1080p)
                        </a>

                        <p className="note">*Redirects to secure Drive storage</p>
                    </div>
                </div>
            </div>

            <style>{`
        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: -1;
        }
        .backdrop-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          filter: blur(20px) brightness(0.4);
        }
        .backdrop-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(20,20,20,0.8), rgba(20,20,20,1));
        }
        .content {
          position: relative;
          z-index: 1;
          padding-top: 40px;
          min-height: 100vh;
        }
        .back-btn {
          display: inline-block;
          margin-bottom: 30px;
          color: var(--text-muted);
          font-weight: 500;
          transition: color 0.3s;
        }
        .back-btn:hover {
          color: white;
        }
        .details-grid {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 60px;
          align-items: start;
        }
        .main-poster {
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }
        .info-col h1 {
          font-size: 3.5rem;
          margin-bottom: 15px;
          line-height: 1.1;
        }
        .meta {
          color: var(--text-muted);
          font-size: 1.1rem;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dot {
          font-size: 1.5rem;
          line-height: 0.5;
        }
        .description {
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 40px;
          max-width: 800px;
        }
        .cast-section {
          margin-bottom: 40px;
        }
        .cast-section h3 {
          margin-bottom: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 1px;
        }
        .download-btn {
          font-size: 1.2rem;
          padding: 15px 40px;
          margin-bottom: 15px;
        }
        .note {
          font-size: 0.8rem;
          color: var(--text-muted);
          opacity: 0.7;
        }
        @media (max-width: 900px) {
          .details-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .poster-col {
            max-width: 300px;
            margin: 0 auto;
          }
          .info-col {
            text-align: center;
          }
          .meta {
            justify-content: center;
          }
        }
      `}</style>
        </div>
    );
};

export default MovieDetails;
