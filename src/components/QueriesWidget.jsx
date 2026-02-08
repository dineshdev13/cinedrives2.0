import React, { useState, useEffect, useRef } from 'react';
import './QueriesWidget.css';

const QueriesWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [movieName, setMovieName] = useState('');
    const [year, setYear] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const panelRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target) && isOpen) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!movieName) return;

        setIsSubmitting(true);

        try {
            const response = await fetch("https://formsubmit.co/ajax/hkrgaming004@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `Movie Request: ${movieName}`,
                    Movie: movieName,
                    Year: year || 'N/A',
                    Source: 'Cinedrives Widget'
                })
            });

            if (response.ok) {
                alert("Request Sent Successfully! 🚀");
                setMovieName('');
                setYear('');
                setIsOpen(false);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            alert("Network error. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="queries-widget">
            {/* Dimming Overlay (Fog) */}
            <div className={`widget-overlay ${isOpen ? 'active' : ''}`}></div>

            {/* Floating Button */}
            {!isOpen && (
                <button
                    className="queries-btn fade-in delay-5"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Queries"
                >
                    <span className="widget-icon">💬</span>
                    Any Queries?
                </button>
            )}

            {/* Slide-up Panel */}
            <div className={`queries-panel ${isOpen ? 'open' : ''}`} ref={panelRef}>
                <div className="panel-header">
                    <div>
                        <h3 className="panel-title">Any Queries?</h3>
                        <p className="panel-subtitle">Facing an issue or requesting a movie?</p>
                    </div>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="widget-label">Movie Name</label>
                        <input
                            type="text"
                            className="widget-input"
                            placeholder="e.g. Interstellar"
                            value={movieName}
                            onChange={(e) => setMovieName(e.target.value)}
                            autoFocus={isOpen}
                        />
                    </div>

                    <div className="form-group">
                        <label className="widget-label">Year (Optional)</label>
                        <input
                            type="text"
                            className="widget-input"
                            placeholder="e.g. 2014"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Get in Touch'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QueriesWidget;
