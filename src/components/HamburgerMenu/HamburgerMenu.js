import React, { useContext } from 'react';

// Context
import { NavbarContext } from '../../contexts/NavbarContext.js';

// Styles
import './HamburgerMenu.styles.scss';

export default function HamburgerMenu({size, children}) {
  const { state } = useContext(NavbarContext);
  let className = 'menu';
  let style = { '--button-size': size };

  if (!state.isActive && state.isSmallScreen) {
    className += ' hide';
  }

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}