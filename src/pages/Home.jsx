import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import '../components/LogoAnimation.css';
import { movies } from '../data/movies';
import '../components/MovieGrid.css'; // Import the new grid styles

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  React.useEffect(() => {
    // Hide intro after 3.5 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page fade-in">
      {/* CINEDRIVES Moment: Intro Overlay */}
      <div className={`intro-overlay ${!showIntro ? 'fade-out' : ''}`}>
        <div className="intro-content">
          <h1 className="intro-logo">CINEDRIVES 2.0</h1>
          <p className="intro-tagline">Experience Cinema Differently</p>
          <div className="intro-glow"></div>
        </div>
      </div>

      {/* Search Dimming Overlay */}
      <div className={`search-overlay ${showSearch ? 'active' : ''}`} onClick={() => setShowSearch(false)}></div>

      <header>
        <div className="container header-content">
          <div className="logo btn-6"><span>CINEDRIVES 2.0</span></div>
          <div className={`search-container ${showSearch ? 'active' : ''}`}>
            <input
              type="text"
              className="search-input"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="search-btn"
              aria-label="Toggle Search"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? '✕' : '🔍'}
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="movie-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div className="no-results fade-in">
              <span className="no-results-icon">🎬</span>
              <p>No movies found matching <span className="highlight">"{searchTerm}"</span></p>
              <button className="btn-clear" onClick={() => setSearchTerm('')}>Clear Search</button>
            </div>
          )}
        </div>
      </main>

      <style>{`
        /* Intro Animation Styles */
        .intro-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: #000;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 1s ease, visibility 1s ease;
        }
        .intro-overlay.fade-out {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }
        .intro-content {
            text-align: center;
            position: relative;
        }
        .intro-logo {
            font-family: 'Christmas Twinkle-Personal use', sans-serif;
            font-size: 5rem;
            color: var(--primary-color);
            margin-bottom: 20px;
            opacity: 0;
            transform: scale(0.9);
            animation: introLogoIn 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .intro-tagline {
            font-family: 'Montserrat', sans-serif;
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.8);
            letter-spacing: 4px;
            text-transform: uppercase;
            opacity: 0;
            transform: translateY(20px);
            animation: introTaglineIn 1s ease forwards 0.8s;
        }
        .intro-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(0, 114, 255, 0.4) 0%, transparent 70%);
            z-index: -1;
            opacity: 0;
            animation: introGlowIn 2s ease forwards 0.5s;
        }

        @keyframes introLogoIn {
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        @keyframes introTaglineIn {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes introGlowIn {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
        }

        .search-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(3px);
            z-index: 90;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease;
        }
        .search-overlay.active {
            opacity: 1;
            pointer-events: all;
        }
        .header-content {
            position: relative;
            z-index: 100; /* Above overlay */
        }
        /* Animated Search Input */
        .search-container {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            position: absolute;
            right: 20px; /* Slight right padding */
            top: 50%;
            transform: translateY(-50%);
        }
        .search-input {
            width: 0;
            opacity: 0;
            padding: 0;
            border: none;
            background: transparent;
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            color: #fff;
            position: absolute;
            right: 50px;
            font-size: 1rem;
        }
        .search-container.active .search-input {
            width: 250px;
            opacity: 1;
            padding: 10px 15px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 30px;
        }
        .search-btn {
            z-index: 101;
            background: transparent;
            border: none;
            color: #fff;
            font-size: 1.2rem;
            cursor: pointer;
            transition: transform 0.3s;
        }
        .search-btn:hover {
            transform: scale(1.1);
        }

        /* No Results Styling */
        .no-results {
            grid-column: 1 / -1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 80px 20px;
            color: var(--text-muted);
            text-align: center;
            animation: fadeIn 0.5s ease;
        }
        .no-results-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            opacity: 0.5;
        }
        .no-results p {
            font-size: 1.5rem;
            margin-bottom: 20px;
            font-weight: 300;
        }
        .highlight {
            color: var(--primary-color);
            font-weight: 500;
        }
        .btn-clear {
            padding: 10px 25px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .btn-clear:hover {
            background: var(--primary-color);
            border-color: var(--primary-color);
        }
      `}</style>
    </div>
  );
};

export default Home;
