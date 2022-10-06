import React from 'react';

// Image
import notFound from '../../assets/no-image.jpg';

// Styles
import './MovieCard.styles.scss';

export default function MovieCard(props) {
  let ratingColor;

  const rating = Number(props.rating);
  if (rating <= 5) ratingColor = "255 0 0";
  else if (rating <= 7.5) ratingColor = "255 255 0";
  else ratingColor = "0 255 0";

  return (
    <div className="card" style={{"--clr-rating": ratingColor}}>
      <img className="card__image" src={props.image ?? notFound} alt={props.title} />
      <div className="card__body">
        <h3 className="card__title">{props.title}</h3>
        <p className="card__rating">{props.rating}</p>
      </div>
    </div>
  );
}
