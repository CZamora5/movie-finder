import React, { useEffect, useState } from 'react';

// Components
import MovieCard from '../../components/MovieCard/MovieCard.js';
import HeroImage from '../../components/HeroImage/HeroImage.js';
import Pagination from '../../components/Pagination/Pagination.js';
import Subheading from '../../components/Subheading/Subheading.js';
import MovieCardSkeleton from '../../components/MovieCardSkeleton/MovieCardSkeleton.js';
import HeroImageSkeleton from '../../components/HeroImageSkeleton/HeroImageSkeleton.js';

// Hooks
import { usePageApiContext, usePageStateContext } from '../../contexts/PageContext.js';

// Api
import { API } from '../../services/api.js';

// Styles
import './NowPlaying.styles.scss';

export default function NowPlaying() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const newest = movies.length ? movies.at(0) : null;
  const { page } = usePageStateContext();
  const {setTotalPages, setPage} = usePageApiContext();

  useEffect(() => {
    setPage(1);
  }, [setPage]);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        const data = await API.fetchMoviesNowPlaying(page);
        setTotalPages(data.total_pages);
        setMovies(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, [page, setTotalPages]);

  return (
    <main className="playing-page">
      {
        isLoading
          ? <>
            <HeroImageSkeleton />
            <section className="playing-page__content playing-page__content--skeleton">
              <div className="container">
                <div className="playing-page__heading-skeleton" />
                <div className="playing-page__grid grid">
                  {
                    new Array(20).fill(0).map((_, index) => {
                      return <MovieCardSkeleton key={index} />;
                    })
                  }
                </div>
              </div>
            </section>
          </>
          : <>
            <HeroImage
              id={newest.id}
              overview={newest.overview}
              title={newest.title}
              image={API.getBackdrop(newest.backdrop_path)}
            />
            <section className="playing-page__content">
              <div className="container">
                <Subheading text="Movies in  threatres" />
                <div className="playing-page__grid grid">
                  {
                    movies.map(movie => {
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
                    })
                  }
                </div>
              </div>
            </section>
            <Pagination />
          </>
      }
    </main>
  );
}
