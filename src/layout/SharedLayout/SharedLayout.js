import React from 'react';
import { Outlet } from 'react-router-dom';

// Contexts
import { NavbarProvider } from '../../contexts/NavbarContext.js';

// Layout
import Navbar from '../Navbar/Navbar.js';
import BackToTopButton from '../BackToTopButton/BackToTopButton.js';

export default function SharedLayout() {
  return (
    <>
      <NavbarProvider>
        <Navbar size="3rem" />
      </NavbarProvider>
      <BackToTopButton />
      <Outlet />
    </>
  );
}
