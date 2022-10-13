import React, { useEffect, useState } from 'react';

// Contexts
import { CarouselContextProvider, CarouselWrapperContextProvider } from '../../contexts/CarouselContext.js';

// Components
import HeroImage from '../../components/HeroImage/HeroImage.js';
import MovieSmallCard from '../../components/MovieSmallCard/MovieSmallCard.js';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel.js';

// Api
import { API } from '../../services/api.js';

// Images
import homeImage from '../../assets/home.jpg';

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
    <main className="home">
      <HeroImage image={homeImage} bgPos="center right" bgColor="var(--clr-darkish-purple)" contentPos="center">
        <section className="home__hero">
          <h1 className="home__title">We have the perfect movie for you, start exploring and find it!</h1>
          <button className="home__search-button">
            <span>Search</span>
          </button>
        </section>
      </HeroImage>
      <div className="container">
        <div className="home__wrapper">
          <CarouselWrapperContextProvider>
            {
              movies.map((movieGenre, index) => (
                <section className="home__section" key={genres[index].id}>
                  <h2 className="home__genre-title">{genres[index].name}</h2>
                  <CarouselContextProvider>
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
                  </CarouselContextProvider>
                </section>
              ))
            }
          </CarouselWrapperContextProvider>
        </div>
      </div>
    </main>
  );
}