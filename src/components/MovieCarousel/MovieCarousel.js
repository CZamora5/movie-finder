import React from 'react';

// Hooks
import {
  useCarouselStateContext,
  useCarouselApiContext
} from '../../contexts/CarouselContext.js';

//  Styles
import './MovieCarousel.styles.scss';

// Svgs
import chevronLeft from '../../assets/chevron-left.svg';
import chevronRight from '../../assets/chevron-right.svg';

export default function MovieCarousel({ children }) {
  const { isFirstVisible, isLastVisible, xPos } = useCarouselStateContext();
  const api = useCarouselApiContext();

  return (
    <div className="carousel" style={{"--x-pos": xPos}}>
      <div className="carousel__wrapper">
        {children}
      </div>
      {
        !isFirstVisible &&
        <div className="carousel__icon  carousel__icon--left" onClick={api.moveLeft}>
          <img className="carousel__svg" src={chevronLeft} alt="Flecha izquierda" />
        </div>
      }
      {
        !isLastVisible &&
        <div className="carousel__icon  carousel__icon--right" onClick={api.moveRight}>
          <img className="carousel__svg" src={chevronRight} alt="Flecha derecha" />
        </div>
      }
    </div>
  );
}
