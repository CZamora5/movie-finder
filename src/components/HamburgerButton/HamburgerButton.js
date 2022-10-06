import React, { useContext } from 'react';

// Context
import { NavbarContext } from '../../contexts/NavbarContext.js';

// Styles
import './HamburgerButton.styles.scss';

export default function HamburgerButton({ size }) {
  const { setIsActive, state } = useContext(NavbarContext);
  let className = 'hamburger';
  let style = { '--button-size': size };

  if (state.isActive) {
    className += ' active';
  }

  if (!state.firstRender) {
    style['--animation-play-state'] = 'running';
    className += ' not-first-render';
  }

  return (
    <div
      className={className}
      onClick={setIsActive}
      style={style}
    />
  );
}