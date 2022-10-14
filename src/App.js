import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Context provider
import { PageContextProvider } from './contexts/PageContext.js';

// Layout
import SharedLayout from './layout/SharedLayout/SharedLayout.js';

// Pages
import Home from './pages/Home/Home.js';
import Popular from './pages/Popular/Popular.js';
import NowPlaying from './pages/NowPlaying/NowPlaying.js';
import Movie from './pages/Movie/Movie.js';
import Search from './pages/Search/Search.js';

// Styles
import './styles/index.scss';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="popular" element={<PageContextProvider><Popular /></PageContextProvider>} />
        <Route path="now-playing" element={<PageContextProvider><NowPlaying /></PageContextProvider>} />
        <Route path="search" element={<PageContextProvider><Search /></PageContextProvider>} />
        <Route path="movies/:movieId" element={<PageContextProvider><Movie /></PageContextProvider>} />
      </Route>
    </Routes>
  );
}