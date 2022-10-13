import {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  DISCOVER_BASE_URL,
  GENRES_BASE_URL,
  IMAGE_BASE_URL,
  BASE_URL,
  API_KEY,
  POSTER_SIZE,
  BACKDROP_SIZE
} from './api.config.js';

async function fetchMovies(page, searchTerm) {
  let endpoint = POPULAR_BASE_URL;

  if (searchTerm) endpoint = `${SEARCH_BASE_URL}&query=${searchTerm}`;
  if (page) endpoint += `&page=${page}`;

  return await fetch(endpoint).then(response => response.json());
}

async function fetchMoviesNowPlaying(page) {
  let endpoint = `${BASE_URL}movie/now_playing?api_key=${API_KEY}`;
  if (page) endpoint += `&page=${page}`;

  return await fetch(endpoint).then(response => response.json());
}

async function fetchGenres() {
  let endpoint = GENRES_BASE_URL;
  return await fetch(endpoint).then(response => response.json());
}

async function fetchMoviesByGenre(genresId) {
  let endpoint = `${DISCOVER_BASE_URL}&with_genres=${genresId.join(',')}`;
  return await fetch(endpoint).then(response => response.json());
}

async function fetchMovie(movieId) {
  const endpoint = `${BASE_URL}movie/${movieId}?api_key=${API_KEY}`;
  return await fetch(endpoint).then(response => response.json());
}

async function fetchSimilarMovies(movieId, page) {
  let endpoint = `${BASE_URL}movie/${movieId}/similar?api_key=${API_KEY}`;
  if (page) endpoint += `&page=${page}`;

  return await fetch(endpoint).then(response => response.json());
}

async function fetchCredits(movieId) {
  const endpoint = `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
  return await fetch(endpoint).then(response => response.json());
}

function getPoster(path) {
  if (!path) return null;
  return `${IMAGE_BASE_URL}${POSTER_SIZE}${path}`;
}

function getBackdrop(path) {
  if (!path) return null;
  return `${IMAGE_BASE_URL}${BACKDROP_SIZE}${path}`;
}

export const API = {
  fetchMovies,
  fetchMoviesNowPlaying,
  fetchGenres,
  fetchMoviesByGenre,
  fetchMovie,
  fetchSimilarMovies,
  fetchCredits,
  getBackdrop,
  getPoster
};