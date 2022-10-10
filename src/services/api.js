import {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  IMAGE_BASE_URL,
  BASE_URL,
  API_KEY,
  POSTER_SIZE,
  BACKDROP_SIZE
} from './api.config.js';

export const API = {
  fetchMovies: async (page, searchTerm) => {
    let endpoint = POPULAR_BASE_URL;

    if (searchTerm) endpoint = `${SEARCH_BASE_URL}&search=${searchTerm}`;
    if (page) endpoint += `&page=${page}`;

    return await fetch(endpoint).then(response => response.json());
  },
  fetchMovie: async movieId => {
    const endpoint = `${BASE_URL}movie/${movieId}?api_key=${API_KEY}`;
    return await fetch(endpoint).then(response => response.json());
  },
  fetchCredits: async movieId => {
    const endpoint = `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    return await fetch(endpoint).then(response => response.json());
  },
  getPoster(path) {
    if (!path) return null;
    return `${IMAGE_BASE_URL}${POSTER_SIZE}${path}`;
  },
  getBackdrop(path) {
    if (!path) return null;
    return `${IMAGE_BASE_URL}${BACKDROP_SIZE}${path}`;
  }
};