import React, { useState, createContext, useEffect } from 'react';

export const NavbarContext = createContext({});

export function NavbarProvider({ children }) {
  const [state, setState] = useState({ firstRender: true, isActive: false, isSmallScreen: true });

  function setIsActive() {
    setState(prevState => ({
      ...prevState,
      firstRender: false,
      isActive: !prevState.isActive,
    }));
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width >= 576 && state.isSmallScreen) {
          setState(prevState => ({
            ...prevState,
            isSmallScreen: false
          }));
        } else if (entry.contentRect.width < 576 && !state.isSmallScreen) {
          setState(prevState => ({
            ...prevState,
            isSmallScreen: true
          }));
        }
      }
    }, [state.isSmallScreen]);

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    }
  });

  return (
    <NavbarContext.Provider value={{ state, setIsActive }}>
      {children}
    </NavbarContext.Provider>
  )
}