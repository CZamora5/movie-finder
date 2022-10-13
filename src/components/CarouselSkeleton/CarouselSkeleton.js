import React from 'react';

// Contexts
import { CarouselContextProvider } from '../../contexts/CarouselContext.js';

// Components
import CardSkeleton from '../CardSkeleton/CardSkeleton.js';
import MovieCarousel from '../MovieCarousel/MovieCarousel.js';

// Styles
import './CarouselSkeleton.styles.scss';

export default function CarouselSkeleton(props) {
  return (
    <section className="carousel-skeleton" key={"s" + props.index}>
      <div className="carousel-skeleton__heading" />
      <CarouselContextProvider>
        <MovieCarousel skeleton={true}>
          {new Array(20).fill(0).map((_, index) => {
            return (
              <CardSkeleton key={"s" + props.index + "c" + index} />
            );
          })}
        </MovieCarousel>
      </CarouselContextProvider>
    </section>
  );
}
