import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Movies from './Components/Movies';
import Navbar from './Components/Navbar';
import MovieDetails from './Components/MovieDetails'; // Adjust the path as necessary


const App = () => {
  const [search, setSearch] = useState(""); // ✅ State to manage search input

  return (
    <div>
      <BrowserRouter>
        <Navbar setSearch={setSearch} />
        <Routes>
          <Route path='/' element={<Movies search={search} />} /> {/* ✅ Pass search as a prop */}
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
