import React from 'react';

// Utils
import { formatRuntime } from '../../utils/formatRuntime';
import { formatDate } from '../../utils/formatDate';
import { formatRevenue } from '../../utils/formatRevenue';

// Images
import star from '../../assets/star.svg';

// Styles
import './MovieDetails.styles.scss';

export default function MovieDetails(props) {
  let directorsList, numDirectors = props.directors.length;
  if (numDirectors === 1) {
    directorsList = props.directors[0];
  } else if (numDirectors >= 2) {
    directorsList = props.directors[0];
    for (let i = 1; i < numDirectors - 1; i++) {
      directorsList += ', ' + props.directors[i];
    }
    directorsList += ' and ' + props.directors[numDirectors - 1];
  }

  return (
    <div className="details">
      <h1 className="details__heading">{props.title}</h1>
      <div className="details__info">
        <span>{formatRuntime(props.runtime)}</span>
        <span>·</span>
        <span>{formatDate(props.release)}</span>
      </div>
      <p className="details__text">{props.overview}</p>
      {
        props.directors.length > 0 &&
        <div className="details__directors">
          <p><span>Directed by:</span> {directorsList}</p>
        </div>
      }
      <div className="details__more-info">
        {
          Number(props.revenue) > 0 &&
          <div className="details__more-info__box">
            <div className="details__more-info__title">Revenue</div>
            <div className="details__more-info__content">
              {formatRevenue(props.revenue)}
            </div>
          </div>
        }
        {
          props.score &&
          <div className="details__more-info__box">
            <div className="details__more-info__title">Score</div>
            <div className="details__more-info__content details__more-info__content--score">
              <img className="details__more-info__img" src={star} alt="A star icon" />
              <span className="details__more-info__score">{(Math.round(props.score * 10) / 10).toFixed(1)}</span>
            </div>
          </div>
        }
      </div>
    </div>
  );
}