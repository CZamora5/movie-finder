import React from 'react';
import { useNavigate } from 'react-router-dom';

// Image
import notFound from '../../assets/no-image.jpg';

// Styles
import './MovieSmallCard.styles.scss';

export default function MovieSmallCard(props) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/movies/${props.id}`)} className="movie-sm-card" style={{"--width": props.width || "5%"}}>
      <img className="movie-sm-card__image" src={props.image ?? notFound} alt={props.title} />
      <div className="movie-sm-card__body">
        <h3 className="movie-sm-card__title">{props.title}</h3>
      </div>
    </div>
  );
}
