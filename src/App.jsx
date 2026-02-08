import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StarryBackground from './components/StarryBackground';
import QueriesWidget from './components/QueriesWidget';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <Router>
      <div className="app">
        <StarryBackground />
        <QueriesWidget />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
