import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Context provider
import { NavbarProvider } from './contexts/NavbarContext.js';
import { PageContextProvider } from './contexts/PageContext.js';

// Layout
import Navbar from './layout/Navbar/Navbar';

// Pages
import Home from './pages/Home/Home.js';
import Popular from './pages/Popular/Popular.js';
import NowPlaying from './pages/NowPlaying/NowPlaying.js';
import Movie from './pages/Movie/Movie.js';

// Styles
import './styles/index.scss';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NavbarProvider><Navbar size="3rem"></Navbar></NavbarProvider>}>
        <Route index element={<Home />} />
        <Route path="popular" element={<PageContextProvider><Popular /></PageContextProvider>} />
        <Route path="now-playing" element={<NowPlaying />} />
        <Route path="movies/:movieId" element={<Movie />} />
      </Route>
    </Routes>
  );
}