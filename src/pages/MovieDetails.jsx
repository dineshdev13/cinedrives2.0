import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movies } from '../data/movies';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === parseInt(id));
  const [isExiting, setIsExiting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  if (!movie) {
    return <div className="container" style={{ paddingTop: '50px' }}>Movie not found.</div>;
  }

  return (
    <div
      className={`details-page fade-in ${isExiting ? 'page-exit' : ''} ${isFocused ? 'focus-active' : ''}`}
      onClick={() => setIsFocused(true)}
    >
      <div className="focus-dim"></div>

      <div className="backdrop">
        <div className="backdrop-image" style={{ backgroundImage: `url(${movie.posterUrl})` }}></div>
        <div className="backdrop-overlay"></div>
      </div>

      <div className="content container">
        <button onClick={handleBack} className="back-btn">← Back to Movies</button>

        <div className="details-grid">
          <div className="poster-col slide-in-left">
            <div className="poster-container poster-glass poster-fade-bottom">
              <img src={movie.posterUrl} alt={movie.title} className="main-poster poster-bloom" />
            </div>
          </div>

          <div className="info-col">
            <h1 className="slide-in-right delay-1">{movie.title}</h1>
            <div className="meta slide-in-right delay-2">
              <span className="year">{movie.year}</span>
              <span className="dot">•</span>
              <span className="genre">{movie.genre}</span>
            </div>

            <p className="description slide-in-right delay-3">{movie.description}</p>

            <div className="cast-section slide-in-right delay-4">
              <h3>Starring</h3>
              <p>{movie.cast}</p>
            </div>

            <div className="slide-in-right delay-5">
              <a href={movie.downloadLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary download-btn">
                Download (1080p)
              </a>
              <p className="note">*Redirects to secure Drive storage</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .page-exit {
            opacity: 0;
            transform: scale(0.95);
            transition: all 0.5s ease;
        }
        .page-exit .main-poster {
            transform: scale(0.9);
        }
        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: -1;
          transition: filter 0.5s ease;
        }
        .focus-active .backdrop {
           filter: blur(25px) brightness(0.3);
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
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          padding: 0;
          transition: color 0.3s;
        }
        .back-btn:hover {
          color: white;
        }
        .details-grid {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 80px; /* Increased spacing */
          align-items: center; /* Vertically center align if content is short, or start */
        }
        .main-poster {
          width: 100%;
          border-radius: 12px;
          display: block;
        }
        .info-col {
            display: flex;
            flex-direction: column;
            gap: 25px; /* Grouping related info with spacing */
        }
        .info-col h1 {
          font-family: 'Love Light', cursive;
          font-size: 5rem;
          margin-bottom: 0; /* Handled by flex gap */
          line-height: 1;
          color: #fff;
          font-weight: 400;
        }
        .meta {
          color: var(--text-muted);
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .genre {
            font-family: 'Geraldine Personal Use', sans-serif;
            font-size: 1.8rem;
            color: var(--primary-color);
            letter-spacing: 1px;
        }
        .dot {
          font-size: 1.5rem;
          line-height: 0.5;
        }
        .description {
          font-family: 'Ballmain', sans-serif;
          font-size: 1.6rem;
          line-height: 1.5;
          margin-bottom: 10px;
          max-width: 800px;
          color: #ddd;
        }
        .cast-section h3 {
          margin-bottom: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 1px;
        }
        .cast-section p {
            font-family: 'Lucy Said Ok Personal Use', sans-serif;
            font-size: 1.5rem;
            color: #fff;
        }
        .download-btn {
          font-size: 1.3rem;
          padding: 16px 45px;
          background: linear-gradient(45deg, var(--primary-color), #00c6ff);
          border: none;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0, 114, 255, 0.4);
          transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
          
          /* Gentle pulse on load */
          animation: pulse 2s ease-out 3;
        }
        
        .download-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 30px rgba(0, 114, 255, 0.8), 0 0 60px rgba(0, 114, 255, 0.4);
          background: linear-gradient(45deg, #00c6ff, var(--primary-color));
        }
        .download-btn:active {
            transform: scale(0.95) translateY(0);
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 114, 255, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(0, 114, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 114, 255, 0); }
        }
        .note {
          font-size: 0.8rem;
          color: var(--text-muted);
          opacity: 0.7;
          margin-top: 10px;
        }
        @media (max-width: 900px) {
          .details-grid {
            grid-template-columns: 1fr;
            gap: 50px;
            padding-bottom: 60px;
          }
          .poster-col {
            max-width: 320px;
            width: 80%; /* Responsive width */
            margin: 0 auto;
            transform: translateY(0); /* Reset any specific transforms */
          }
          .info-col {
            text-align: center;
            align-items: center; /* Center align flex items */
          }
          .info-col h1 {
            font-size: 3.5rem; /* Smaller title on tablet/mobile */
          }
          .meta {
            justify-content: center;
            flex-wrap: wrap; /* Allow wrapping on small screens */
            gap: 10px;
          }
          .description {
            font-size: 1.2rem; /* Slightly larger for readability on touch */
            text-align: center; /* Center text for editorial feel */
            padding: 0 10px;
          }
          .download-btn {
            width: 100%; /* Full width button for easy tapping */
            max-width: 300px;
            padding: 18px 30px; /* Larger touch target */
          }
        }

        @media (max-width: 480px) {
          .content {
            padding-top: 20px; 
          }
          .info-col h1 {
            font-size: 2.8rem;
          }
          .poster-col {
             width: 75%;
          }
          .back-btn {
             margin-bottom: 15px;
          }
          .meta {
            font-size: 1rem;
          }
          .genre {
             font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MovieDetails;
