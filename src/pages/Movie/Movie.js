import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Hooks
import { usePageStateContext, usePageApiContext } from '../../contexts/PageContext.js';

// Api
import { API } from '../../services/api.js';

// Components
import HeroImage from '../../components/HeroImage/HeroImage.js';
import MovieDetails from '../../components/MovieDetails/MovieDetails.js';
import ActorCard from '../../components/ActorCard/ActorCard.js';
import MovieSmallCard from '../../components/MovieSmallCard/MovieSmallCard.js';
import Subheading from '../../components/Subheading/Subheading.js';
import Pagination from '../../components/Pagination/Pagination.js';
import MovieCardSkeleton from '../../components/MovieCardSkeleton/MovieCardSkeleton.js';
import HeroImageSkeleton from '../../components/HeroImageSkeleton/HeroImageSkeleton.js';
import MovieDetailsSkeleton from '../../components/MovieDetailsSkeleton/MovieDetailsSkeleton.js';

// Styles
import './Movie.styles.scss';

export default function Movie() {
  const { movieId: id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);
  const [displayingCast, setDisplayingCast] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { page } = usePageStateContext();
  const { setPage, setTotalPages } = usePageApiContext();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const localStorageData = JSON.parse(localStorage.getItem(id));
        if (!localStorageData) {
          const movieData = await API.fetchMovie(id);
          localStorage.setItem(id, JSON.stringify(movieData));
          setMovie(movieData);
        } else {
          setMovie(localStorageData);
        }

        const credits = await API.fetchCredits(id);
        setCredits(credits);

        setPage(1);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [id, setPage]);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const similarMoviesData = await API.fetchSimilarMovies(id, page);
        setSimilarMovies(similarMoviesData.results);
        setTotalPages(similarMoviesData.total_pages);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [id, page, setTotalPages]);

  return (
    <main className="movie-page">
      {
        isLoading || !movie || !credits
          ? <HeroImageSkeleton contentPos="center">
            <MovieDetailsSkeleton />
          </HeroImageSkeleton>
          : <HeroImage image={API.getBackdrop(movie.backdrop_path)} contentPos="center">
            <MovieDetails
              title={movie.title}
              runtime={movie.runtime}
              release={movie.release_date}
              score={movie.vote_average}
              overview={movie.overview}
              revenue={movie.revenue}
              directors={
                credits?.crew
                  ? credits.crew
                    .filter(member => member.department === "Directing")
                    .map(member => member.name)
                  : []
              }
            />
          </HeroImage>
      }
      <section className="container">
        <div className="movie-page__container">
          <div className="movie-page__buttons">
            <button
              onClick={() => {
                if (!displayingCast) setDisplayingCast(true);
              }}
              className={'movie-page__button' + (displayingCast ? ' active' : '')}
            >
              Cast
            </button>
            <button
              className={'movie-page__button' + (!displayingCast ? ' active' : '')}
              onClick={() => {
                if (displayingCast) setDisplayingCast(false);
              }}
            >
              Similar movies
            </button>
          </div>
          <div className="movie-page__content">
            {
              isLoading || !credits || !similarMovies
                ? <>
                  <div className="movie-page__heading-skeleton" />
                  <div className="popular-page__grid grid">
                    {
                      new Array(20).fill(0).map((_, index) => {
                        return <MovieCardSkeleton key={index} />;
                      })
                    }
                  </div>
                </>
                : displayingCast
                  ? <>
                    <Subheading text="Cast" />
                    <div className="grid movie-page__cast">
                      {credits.cast.map((actor, idx) => {
                        return (
                          <ActorCard
                            key={actor.id + "idx" + idx}
                            image={API.getPoster(actor.profile_path)}
                            name={actor.name}
                            character={actor.character}
                          />
                        );
                      })}
                    </div>
                  </>
                  : <>
                    <Subheading text="Similar movies" />
                    <div className="grid">
                      {similarMovies.map(movie => {
                        return (
                          <MovieSmallCard
                            key={movie.id}
                            id={movie.id}
                            image={API.getPoster(movie.poster_path)}
                            title={movie.title}
                            width="100%"
                          />
                        );
                      })}
                    </div>
                    <Pagination />
                  </>
            }
          </div>
        </div>
      </section>
    </main>
  );
}