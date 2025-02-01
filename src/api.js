// api.js
import axios from 'axios';

const API_KEY = 'b8c7f4ee2f58fc62fe07d34f2dc783d4';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    return response.data;
  } catch (error) {
    console.log('Error Fetching Movies...', error);
    return { results: [], total_pages: 1 };  // Returning empty results for error handling
  }
};

export const searchMovie = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    return response.data;
  } catch (error) {
    console.log("Error searching Movies", error);
    return { results: [], total_pages: 1 };  // Returning empty results for error handling
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.log("Error Fetching Movie Details", error);
    return null;
  }
};
