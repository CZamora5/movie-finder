import React, { useContext, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

// Context
import { NavbarContext } from '../../contexts/NavbarContext.js';

// Components
import HamburgerButton from '../../components/HamburgerButton/HamburgerButton.js';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu.js';
import Logo from '../../components/Logo/Logo.js';

// Styles
import './Navbar.styles.scss';

export default function Navbar({ size }) {
  const { state } = useContext(NavbarContext);

  let classList = 'navbar__list__item';
  let tabIndex;

  if (state.isSmallScreen) {
    classList += state.isActive ? ' small-screen' : ' small-screen deactivate';
    tabIndex = state.isActive ? 0 : -1;
  } else {
    classList += ' large-screen';
  }

  return (
    <Fragment>
      <nav className="navbar container">
        <Logo />
        <div className="navbar__list">
          <HamburgerMenu size={size} >
            <NavLink to="/" end className={classList} tabIndex={tabIndex}>Home</NavLink>
            <NavLink to="/popular" className={classList} tabIndex={tabIndex}>Popular</NavLink>
            <NavLink to="/now-playing" className={classList} tabIndex={tabIndex}>Now Playing</NavLink>
            <NavLink to="/search" className={classList} tabIndex={tabIndex}>Search</NavLink>
          </HamburgerMenu>
          <HamburgerButton size={size} />
        </div>
      </nav>
    </Fragment>
  )
}