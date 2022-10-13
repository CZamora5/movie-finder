import React from 'react';

// Styles
import './MovieCardSkeleton.styles.scss';

export default function MovieCardSkeleton() {
  return (
    <div className="movie-card-skeleton">
      <div className="movie-card-skeleton__image"></div>
      <div className="movie-card-skeleton__body">
        <div className="movie-card-skeleton__info">
          <div className="movie-card-skeleton__title">
            <div className="movie-card-skeleton__title__firstline"></div>
            <div className="movie-card-skeleton__title__secondline"></div>
          </div>
          <div className="movie-card-skeleton__release"></div>
        </div>
        <div className="movie-card-skeleton__rating"></div>
      </div>
    </div>
  );
}
