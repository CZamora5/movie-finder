import React from 'react';

//  Styles
import './MovieCarousel.styles.scss';

// Svgs
import chevronLeft from '../../assets/chevron-left.svg';
import chevronRight from '../../assets/chevron-right.svg';

export default function MovieCarousel({ children }) {
  return (
    <div className="carousel">
      <div className="carousel__wrapper">
        <div className="carousel__icon  carousel__icon--left">
          <img className="carousel__svg" src={chevronLeft} alt="Flecha izquierda" />
        </div>
        {children}
        <div className="carousel__icon  carousel__icon--right">
          <img className="carousel__svg" src={chevronRight} alt="Flecha derecha" />
        </div>
      </div>
    </div>
  );
}
