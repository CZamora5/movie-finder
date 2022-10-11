import React, { useEffect, useState } from 'react';

// Components
import MovieCard from '../../components/MovieCard/MovieCard.js';
import HeroImage from '../../components/HeroImage/HeroImage.js';
import Pagination from '../../components/Pagination/Pagination.js';

// Hooks
import { usePageApiContext, usePageStateContext } from '../../contexts/PageContext.js';

// Api
import { API } from '../../services/api.js';

export default function Popular() {
  const [movies, setMovies] = useState([]);
  const mostPopular = movies.length ? movies.at(0) : null;
  const {page} = usePageStateContext();
  const pageApi = usePageApiContext();

  useEffect(() => {
    async function getMovies() {
      try {
        const data = await API.fetchMovies(page);
        pageApi.setTotalPages(data.total_pages);
        setMovies(data.results);
      } catch (err) {
        console.error(err);
      }
    }

    getMovies();
  }, [page, pageApi]);

  return (
    <main>
      {
        mostPopular &&
          <HeroImage
            id={mostPopular.id}
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
                id={movie.id}
                release={movie.release_date}
                image={API.getPoster(movie.poster_path)}
                title={movie.title}
                rating={movie.vote_average}
              />
            );
          })}
        </div>
      </section>

      <Pagination />
    </main>
  );
}
