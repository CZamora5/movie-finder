import React, { useEffect, useState } from 'react';

// Components
import MovieSmallCard from '../../components/MovieSmallCard/MovieSmallCard.js';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel.js';

// Api
import { API } from '../../services/api.js';

// Styles
import './Home.styles.scss';

export default function Home() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getGenres() {
      try {
        const data = await API.fetchGenres();
        setGenres(data.genres);
      } catch (err) {
        console.error(err);
      }
    }

    getGenres();
  }, []);

  useEffect(() => {
    if (!genres) return;

    async function getMovies() {
      const ids = genres.map(genre => genre.id);
      try {
        const data = await Promise.all(ids.map(id => API.fetchMoviesByGenre([id])));
        setMovies(data.map(genreData => genreData.results));
      } catch (err) {
        console.error(err);
      }
    }

    getMovies();
  }, [genres]);

  if (!movies) {
    return <></>;
  }

  return (
    <main className="container home">
      <div className="home__wrapper">
        {
          movies.map((movieGenre, index) => (
            <section className="home__section" key={genres[index].id}>
              <h2>{genres[index].name}</h2>
              <MovieCarousel>
                {movieGenre.map(movie => {
                  return (
                    <MovieSmallCard
                      key={"g" + genres[index].id + "m" + movie.id}
                      id={movie.id}
                      image={API.getPoster(movie.poster_path)}
                      title={movie.title}
                    />
                  );
                })}
              </MovieCarousel>
            </section>
          ))
        }
      </div>
    </main>
  );
}