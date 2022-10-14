import React from 'react';

// Styles
import './MovieDetailsSkeleton.styles.scss';

export default function MovieDetailsSkeleton() {
  return (
    <div className="details-skeleton">
      <div className="details-skeleton__heading"></div>
      <div className="details-skeleton__info"></div>
      <div className="details-skeleton__text">
        <div className="details-skeleton__text__line"></div>
        <div className="details-skeleton__text__line"></div>
      </div>
      <div className="details-skeleton__directors"></div>
      <div className="details-skeleton__more-info">
        <div className="details-skeleton__more-info__box">
        </div>
        <div className="details-skeleton__more-info__box">
        </div>
      </div>
    </div>
  );
}