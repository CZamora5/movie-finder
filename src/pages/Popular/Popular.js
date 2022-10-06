import React, { useEffect, useState } from 'react';

// Components
import MovieCard from '../../components/MovieCard/MovieCard.js';
import HeroImage from '../../components/HeroImage/HeroImage.js';

// Api
import { API } from '../../services/api.js';

export default function Popular() {
  const [movies, setMovies] = useState([]);
  const mostPopular = movies.length ? movies.at(0) : null;

  useEffect(() => {
    async function getMovies() {
      try {
        const data = await API.fetchMovies();
        setMovies(data.results);
        console.log(data.results[0])
      } catch (err) {
        console.error(err);
      }
    }

    getMovies();
  }, []);

  return (
    <main>
      {
        mostPopular &&
          <HeroImage
            overview={mostPopular.overview}
            title={mostPopular.title}
            image={API.getBackdrop(mostPopular.backdrop_path)}
          />
      }
      <section className="container grid__container">
        <div className="grid">
          {movies.map(movie => {
            return (
              <MovieCard
                key={movie.id}
                image={API.getPoster(movie.poster_path)}
                title={movie.title}
                rating={movie.vote_average}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
