import React from 'react';
import { useNavigate } from 'react-router-dom';

// Image
import notFound from '../../assets/no-image.jpg';

// Styles
import './MovieCard.styles.scss';

export default function MovieCard(props) {
  const navigate = useNavigate();
  let ratingColor, ratingTextColor;

  const rating = Number(props.rating);
  if (rating <= 5) {
    ratingColor = '255 20 20';
    ratingTextColor = 'rgb(100, 50, 50)';
  } else if (rating <= 7.5) {
    ratingColor = '255 255 20';
    ratingTextColor = 'rgb(150, 100, 20)';
  } else {
    ratingColor = '20 255 20';
    ratingTextColor = 'rgb(50, 100, 50)';
  }

  return (
    <div
      onClick={() => navigate(`/movies/${props.id}`)}
      className="movie-card"
      style={{ "--clr-rating": ratingColor, "--clr-text-rating": ratingTextColor }}
    >
      <img className="movie-card__image" src={props.image ?? notFound} alt={props.title} />
      <div className="movie-card__body">
        <div className="card__info">
          <h3 className="movie-card__title">{props.title}</h3>
          <h4 className="movie-card__release">{props.release}</h4>
        </div>
        <p className="movie-card__rating">{props.rating.toFixed(1)}</p>
      </div>
    </div>
  );
}
