import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Context provider
import { NavbarProvider } from './contexts/NavbarContext.js';

// Layout
import Navbar from './layout/Navbar/Navbar';

// Pages
import Home from './pages/Home/Home.js';
import Popular from './pages/Popular/Popular.js';
import NowPlaying from './pages/NowPlaying/NowPlaying.js';

// Styles
import './styles/index.scss';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NavbarProvider><Navbar size="3rem"></Navbar></NavbarProvider>}>
        <Route path="popular" element={<Popular />} />
        <Route path="now-playing" element={<NowPlaying />} />
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}