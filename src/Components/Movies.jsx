import React, { useEffect, useState } from 'react';
import { fetchMovies, searchMovie } from '../api';
import { Link } from 'react-router-dom';  // Import Link from React Router
import './Movies.css';


const Movies = ({ search }) => {
  const [movies, setMovies] = useState([]);  // Ensure it's initialized as an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);  // Loading state

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const visiblePages = 5; // Number of page buttons to show at a time
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        let data;
        if (search && search.trim() !== "") {
          data = await searchMovie(search, currentPage);  // Fetch search results
        } else {
          data = await fetchMovies(currentPage);  // Fetch popular movies
        }

        console.log('Fetched Data:', data);  // Log the fetched data to check its structure

        setMovies(data.results || []);  // Ensure `movies` is always an array
        setTotalPages(data.total_pages || 1);  // Ensure `totalPages` is set properly
        setIsLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.log('Error fetching movies:', error);
        setIsLoading(false);
      }
    };
    getMovies();
  }, [search, currentPage]);

  return (
    <div>
      {isLoading ? <h1>Loading...</h1> : (
        <div className="movies-container">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-link">
                <div className="movie-card">
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'path_to_placeholder_image.jpg'}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                </div>
              </Link>
            ))
          ) : (
            <h1>No Movies Found</h1>
          )}
        </div>
      )}
      
      <div className="pagination">
        <button 
          disabled={currentPage === 1} 
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        {getPageNumbers().map((page) => (
          <button 
            key={page} 
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}

        <button 
          disabled={currentPage === totalPages} 
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
