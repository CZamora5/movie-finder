import React from 'react';

// Styles
import './HeroImageSkeleton.styles.scss';

export default function HeroImageSkeleton(props) {

  if (props.children) {
    return (
      <section className="hero-skeleton__wrapper">
        <div className="container">
          {props.children}
        </div>
      </section>
    );
  }

  return (
    <section className="hero-skeleton__wrapper">
      <div className="container">
        <div className="hero-skeleton__body">
          <div className="hero-skeleton__heading">{props.title}</div>
          <div className="hero-skeleton__text">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="hero-skeleton__button"></div>
        </div>
      </div>
    </section>
  );
}