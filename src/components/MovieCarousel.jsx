import React, { useState } from 'react';
import MovieCard from './MovieCard';
import './MovieCarousel.css';

const MovieCarousel = ({ movies }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
    };

    const getCardStyle = (index) => {
        const diff = (index - activeIndex + movies.length) % movies.length;

        // Normalize diff to be between -length/2 and length/2
        const normalizedDiff = diff > movies.length / 2 ? diff - movies.length : diff;

        if (normalizedDiff === 0) {
            return 'carousel-item active';
        } else if (normalizedDiff === -1 || normalizedDiff === movies.length - 1) {
            return 'carousel-item left';
        } else if (normalizedDiff === 1 || normalizedDiff === -(movies.length - 1)) {
            return 'carousel-item right';
        } else {
            return 'carousel-item hidden';
        }
    };

    return (
        <div className="carousel-container">
            <div className="carousel-track">
                {movies.map((movie, index) => (
                    <div key={movie.id} className={getCardStyle(index)}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>

            <div className="carousel-controls">
                <button className="nav-btn prev" onClick={prevSlide}>&#8249;</button>
                <button className="nav-btn next" onClick={nextSlide}>&#8250;</button>
            </div>
        </div>
    );
};

export default MovieCarousel;
