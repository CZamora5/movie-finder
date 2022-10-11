import React from 'react';

//  Styles
import './MovieCarousel.styles.scss';

export default function MovieCarousel({ children }) {
  return (
    <div className="carousel">
      {children}
    </div>
  );
}
