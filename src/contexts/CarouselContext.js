import React, { useState, useEffect, createContext, useMemo, useContext } from 'react';

// Utils
import { convertPixelsToRem } from '../utils/convertPixelsToRem.js';

const CarouselApiContext = createContext(null);
const CarouselStateContext = createContext(null);
const CarouselWrapperContext = createContext(null);

export function useCarouselStateContext() {
  const carouselState = useContext(CarouselStateContext);

  if (!carouselState) {
    throw new Error('There is no provider for carousel state context');
  }

  return carouselState;
}

export function useCarouselWrapperContext() {
  const carouselWrapperState = useContext(CarouselWrapperContext);

  if (!carouselWrapperState) {
    throw new Error('There is no provider for carousel wrapper state context');
  }

  return carouselWrapperState;
}

export function useCarouselApiContext() {
  const api = useContext(CarouselApiContext);

  if (!api) {
    throw new Error('There is no provider for carousel api context');
  }

  return api;
}

export function CarouselWrapperContextProvider({ children }) {
  const [
    numberOfCardsVisible,
    setNumberOfCardsVisible
  ] = useState(Math.min(7, Math.max(1, Math.floor((convertPixelsToRem(window.innerWidth) - 1) / 13))));

  useEffect(() => {
    function handleResize() {
      const widthInRems = convertPixelsToRem(window.innerWidth);
      const numCards = Math.min(7, Math.max(1, Math.floor((widthInRems - 1) / 13)));

      if (numCards !== numberOfCardsVisible) {
        setNumberOfCardsVisible(numCards);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('resize', handleResize);
    };
  }, [numberOfCardsVisible]);

  return (
    <CarouselWrapperContext.Provider value={{ numberOfCardsVisible }}>
      {children}
    </CarouselWrapperContext.Provider>
  );
}

export function CarouselContextProvider({ children }) {
  const [isFirstVisible, setIsFirstVisible] = useState(true);
  const [isLastVisible, setIsLastVisible] = useState(false);
  const { numberOfCardsVisible } = useCarouselWrapperContext();
  const [xPos, setXPos] = useState(0);

  const api = useMemo(() => {
    return {
      moveLeft: () => {
        if (isFirstVisible) return;

        setXPos(prevXPos => {
          const newXPos = Math.max(0, prevXPos - numberOfCardsVisible);
          if (newXPos === 0) setIsFirstVisible(true);
          return newXPos;
        });
        setIsLastVisible(false);
      },
      moveRight: () => {
        if (isLastVisible) return;

        setXPos(prevXPos => {
          const newXPos = Math.min(20 - numberOfCardsVisible, prevXPos + numberOfCardsVisible);
          if (newXPos + numberOfCardsVisible >= 19) setIsLastVisible(true);
          return newXPos;
        });
        setIsFirstVisible(false);
      }
    };
  }, [isFirstVisible, isLastVisible, numberOfCardsVisible]);

  return (
    <CarouselStateContext.Provider value={{ isFirstVisible, isLastVisible, xPos }}>
      <CarouselApiContext.Provider value={api}>
        {children}
      </CarouselApiContext.Provider>
    </CarouselStateContext.Provider>
  );
}