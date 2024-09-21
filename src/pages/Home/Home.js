import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Contexts
import { CarouselContextProvider, CarouselWrapperContextProvider } from '../../contexts/CarouselContext.js';

// Components
import HeroImage from '../../components/HeroImage/HeroImage.js';
import MovieSmallCard from '../../components/MovieSmallCard/MovieSmallCard.js';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel.js';
import Subheading from '../../components/Subheading/Subheading.js';

// Api
import { API } from '../../services/api.js';

// Images
import homeImage from '../../assets/home.jpg';
// import homeImageLowRes from '../../assets/home-lower-quality.jpg';

// Styles
import './Home.styles.scss';
import CarouselSkeleton from '../../components/CarouselSkeleton/CarouselSkeleton.js';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        // Fetching genre data
        const genreData = await API.fetchGenres();
        setGenres(genreData.genres);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        if (!genres) return;
        setIsLoading(true);

        // Storing the id to fetch movies by id and finally setting the movies
        const ids = genres.map(genre => genre.id);
        const data = await Promise.all(ids.map(id => API.fetchMoviesByGenre([id])));
        setMovies(data.map(genreData => genreData.results));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [genres]);

  return (
    <main className="home">
      <HeroImage image={homeImage} bgPos="center right" bgColor="var(--clr-darkish-purple)" contentPos="center">
        <section className="home__hero">
          <h1 className="home__title">We have the perfect movie for you, start exploring and find it!</h1>
          <button onClick={() => navigate("search")} className="home__search-button">
            <span>Search</span>
          </button>
        </section>
      </HeroImage>
      <div className="container">
        <div className="home__wrapper">
          <CarouselWrapperContextProvider>
            {
              isLoading
                ? new Array(19).fill(0).map((_, index) => (
                  <CarouselSkeleton key={index} index={index} />
                ))
                : movies.map((movieGenre, index) => (
                  <section className="home__section" key={genres[index].id}>
                    <Subheading text={genres[index].name} />
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
