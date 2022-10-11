import React from 'react';

//  Styles
import './MovieCarousel.styles.scss';

export default function MovieCarousel({ children }) {
  return (
    <div className="carousel">
      <div className="carousel__wrapper">
        {children}
      </div>
    </div>
  );
}
