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

// Styles
import './Movie.styles.scss';

export default function Movie() {
  const { movieId: id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);
  const [displayingCast, setDisplayingCast] = useState(true);
  const { page } = usePageStateContext();
  const { setPage, setTotalPages } = usePageApiContext();

  useEffect(() => {
    async function getData() {
      try {
        const movieData = await API.fetchMovie(id);
        console.log(movieData)
        const credits = await API.fetchCredits(id);

        setMovie(movieData);
        setCredits(credits);
        setPage(1);
      } catch (err) {
        console.error(err);
      }
    }

    getData();
  }, [id, setPage]);

  useEffect(() => {
    async function getData() {
      try {
        const similarMoviesData = await API.fetchSimilarMovies(id, page);
        setSimilarMovies(similarMoviesData.results);
        setTotalPages(similarMoviesData.total_pages);
      } catch (err) {
        console.error(err);
      }
    }

    getData();
  }, [id, page, setTotalPages]);

  if (!movie || !credits.cast) {
    return <></>;
  }

  return (
    <main className="movie-page">
      <HeroImage image={API.getBackdrop(movie.backdrop_path)} contentPos="center">
        <MovieDetails
          title={movie.title}
          runtime={movie.runtime}
          release={movie.release_date}
          score={movie.vote_average}
          overview={movie.overview}
          revenue={movie.revenue}
          directors={
            credits.crew
              .filter(member => member.department === "Directing")
              .map(member => member.name)
          }
        />
      </HeroImage>
      <section className="container movie-page__container">
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
            displayingCast
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
      </section>
    </main>
  );
}