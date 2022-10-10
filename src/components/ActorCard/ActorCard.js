import React from 'react';

// Image
import notFound from '../../assets/no-image.jpg';

// Styles
import './ActorCard.styles.scss';

export default function ActorCard(props) {
  return (
    <div className="actor-card">
      <img className="actor-card__image" src={props.image ?? notFound} alt={props.title} />
      <div className="actor-card__body">
        <h3 className="actor-card__name">{props.name}</h3>
        <h4 className="actor-card__character">{props.character}</h4>
      </div>
    </div>
  );
}
