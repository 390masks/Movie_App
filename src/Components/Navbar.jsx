import React, { useState, useEffect } from 'react';
import './Navbar.css';


const Navbar = ({ setSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setSearch(query);
    }, 500); // Debounce: Waits 500ms before updating search

    return () => clearTimeout(delaySearch); // Cleanup timeout on every re-render
  }, [query, setSearch]);

  return (
    <nav className="navbar">
      <h1>🎬 Movie Hub</h1>
      <input 
        type="text"
        value={query}
        placeholder="Search movies..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </nav>
  );
}

export default Navbar;
