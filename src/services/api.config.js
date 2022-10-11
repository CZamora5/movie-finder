const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = process.env.REACT_APP_API_KEY;

const SEARCH_BASE_URL = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US`;
const POPULAR_BASE_URL = `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US`;
const DISCOVER_BASE_URL = `${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US`;
const GENRES_BASE_URL = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
const BACKDROP_SIZE = 'w1280';
const POSTER_SIZE = 'w780';

export {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  DISCOVER_BASE_URL,
  BASE_URL,
  API_KEY,
  GENRES_BASE_URL,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
};