import React from 'react';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';

const Home = () => {
    return (
        <div className="home-page fade-in">
            <header>
                <div className="container">
                    <div className="logo">CineDrive</div>
                </div>
            </header>

            <main className="container">
                <div className="movie-grid">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </main>

            <style>{`
        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 30px;
          padding-bottom: 50px;
        }
        @media (max-width: 600px) {
          .movie-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
          }
        }
      `}</style>
        </div>
    );
};

export default Home;
