import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api'; // Correct import statement
import './MovieDetails.css';


const MovieDetails = () => {
  const { movieId } = useParams(); // Get the movieId from the URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(movieId);
      setMovie(data);
    };
    getMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      {/* Movie Poster */}
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      {/* Movie Info */}
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>

        <h3>Release Date: {movie.release_date}</h3>
        <h4>Rating: {movie.vote_average}</h4>

        {/* Add a button for any action like "Back to Movies" */}
        <a href="/" className="btn">
          Back to Movies
        </a>
      </div>
    </div>
  );
};

export default MovieDetails;
