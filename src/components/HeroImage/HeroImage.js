import React from 'react';

import './HeroImage.styles.scss';

export default function HeroImage(props) {
  const url = `url(${props.image})`;
  return (
    <section className="hero__wrapper" style={{ "--url": url }}>
      <div className="container">
        <div className="hero__body">
          <h1 className="hero__heading">{props.title}</h1>
          <p className="hero__text">{props.overview}</p>
          <button className="hero__button">See more</button>
        </div>
      </div>
    </section>
  );
}