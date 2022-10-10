import React from 'react';
import { useNavigate } from 'react-router-dom';

import './HeroImage.styles.scss';

export default function HeroImage(props) {
  const url = `url(${props.image})`;
  const navigate = useNavigate();

  if (props.children)  {
    return (
      <section className="hero__wrapper" style={{ "--url": url }}>
        <div className="container">
          {props.children}
        </div>
      </section>
    );
  }

  return (
    <section className="hero__wrapper" style={{ "--url": url }}>
      <div className="container">
        <div className="hero__body">
          <h1 className="hero__heading">{props.title}</h1>
          <p className="hero__text">{props.overview}</p>
          <button onClick={() => navigate(`/movies/${props.id}`)} className="hero__button">See more</button>
        </div>
      </div>
    </section>
  );
}