import React, { useEffect, useState } from 'react';

// Components
import MovieCard from '../../components/MovieCard/MovieCard.js';
import HeroImage from '../../components/HeroImage/HeroImage.js';
import Pagination from '../../components/Pagination/Pagination.js';
import Subheading from '../../components/Subheading/Subheading.js';
import MovieCardSkeleton from '../../components/MovieCardSkeleton/MovieCardSkeleton.js';

// Hooks
import { usePageStateContext, usePageApiContext } from '../../contexts/PageContext.js';

// Api
import { API } from '../../services/api.js';

// Svgs
import searchIcon from '../../assets/search-icon.svg';

// Styles
import './Search.styles.scss';

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { page } = usePageStateContext();
  const { setTotalPages, setPage } = usePageApiContext();

  useEffect(() => {
    setPage(1);
  }, [setPage, searchTerm]);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        const data = await API.fetchMovies(page, searchTerm);
        setTotalPages(data.total_pages);
        setMovies(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, [page, searchTerm, setTotalPages]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (inputValue !== searchTerm) {
      setSearchTerm(inputValue);
    }
  }

  return (
    <main className="search-page">
      <HeroImage
        contentPos="center"
        bgColor="var(--clr-accent)"
        height="max(15rem, 50vh)"
      >
        <div className="search-page__form-container">
          <form onSubmit={handleSubmit} className="search-page__form">
            <input
              className="search-page__input"
              type="text"
              placeholder="Search for a movie"
              value={inputValue}
              onChange={(evt) => setInputValue(evt.target.value)}
            />
            <button className="search-page__button">
              <img className="search-page__button-icon" src={searchIcon} alt="Magnifying glass" />
              <span className="search-page__button-text">Search</span>
            </button>
          </form>
        </div>
      </HeroImage>
      {
        isLoading
          ? <section className="search-page__content search-page__content--skeleton">
            <div className="container">
              <div className="search-page__heading-skeleton" />
              <div className="search-page__grid grid">
                {
                  new Array(20).fill(0).map((_, index) => {
                    return <MovieCardSkeleton key={index} />;
                  })
                }
              </div>
            </div>
          </section>
          : <>
            <section className="search-page__content">
              <div className="container">
                <Subheading
                  text={
                    !searchTerm
                      ? 'Suggested movies'
                      : movies.length > 0
                        ? `Showing results for ${searchTerm}`
                        : `No results for ${searchTerm}`
                  }
                />
                <div className="search-page__grid grid">
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
