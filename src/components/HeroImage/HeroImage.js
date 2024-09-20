import React from 'react';
import { useNavigate } from 'react-router-dom';

// Styles
import './HeroImage.styles.scss';

// Image
import background from '../../assets/background.jpg';

export default function HeroImage(props) {
  const url = background;
  // if (Array.isArray(props.image)) {
  //   const urlArray = props.image.map(img => `url(${img})`);
  //   url = urlArray.join(',');
  // } else {
  //   url = `url(${props.image ?? background})`;
  // }
  const navigate = useNavigate();

  if (props.children) {
    const style = {
      '--url': url,
      '--bg-pos': props.bgPos || 'center',
      '--content-pos': props.contentPos || 'flex-end',
      '--bg-color': props.bgColor || 'var(--clr-main)',
      '--height': props.height || 'max(24rem, 80vh)',
    };

    return (
      <section className="hero__wrapper" style={style}>
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
          <button onClick={() => navigate(`/movies/${props.id}`)} className="hero__button">
            <span>See more</span>
          </button>
        </div>
      </div>
    </section>
  );
}
