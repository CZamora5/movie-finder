import React from 'react';

// Utils
import { formatRuntime } from '../../utils/formatRuntime';
import { formatDate } from '../../utils/formatDate';

// Styles
import './MovieDetails.styles.scss';

export default function MovieDetails(props) {
  return (
    <div className="details">
      <h1 className="details__heading">{props.title}</h1>
      <div className="details__info">
        <span>{formatRuntime(props.runtime)}</span>
        <span>·</span>
        <span>{formatDate(props.release)}</span>
      </div>
      <p className="details__text">{props.overview}</p>
      {/* <div className="details-score">{(Math.round(props.score * 10) / 10).toFixed(1)}</div> */}
    </div>
  );
}
