import React, { useState, createContext, useEffect } from 'react';

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export const NavbarContext = createContext({});

export function NavbarProvider({ children }) {
  const [state, setState] = useState({
    firstRender: true,
    isActive: false,
    isSmallScreen: window.innerWidth < convertRemToPixels(36)
  });

  function setIsActive() {
    setState(prevState => ({
      ...prevState,
      firstRender: false,
      isActive: !prevState.isActive,
    }));
  }

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      if (width >= convertRemToPixels(36) && state.isSmallScreen) {
        setState(prevState => ({
          ...prevState,
          isSmallScreen: false
        }));
      } else if (width < convertRemToPixels(36) && !state.isSmallScreen) {
        setState(prevState => ({
          ...prevState,
          isSmallScreen: true
        }));
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('resize', handleResize);
    }
  }, [state.isSmallScreen]);

  return (
    <NavbarContext.Provider value={{ state, setIsActive }}>
      {children}
    </NavbarContext.Provider>
  )
}