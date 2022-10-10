import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Api
import { API } from '../../services/api.js';

// Components
import HeroImage from '../../components/HeroImage/HeroImage.js';
import ActorCard from '../../components/ActorCard/ActorCard.js';

export default function Movie() {
  const { movieId: id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const movieData = await API.fetchMovie(id);
        const credits = await API.fetchCredits(id);
        setMovie(movieData);
        setCast(credits.cast);
      } catch (err) {
        console.error(err);
      }
    }

    getData();
  }, [id]);

  if (!movie || !cast) {
    return <></>;
  }

  return (
    <main>
      <HeroImage image={API.getBackdrop(movie.backdrop_path)}>
        <h1>{movie.title}</h1>
      </HeroImage>
      <section className="container grid__container">
        <div className="grid">
          {cast.map(actor => {
            return (
              <ActorCard
                key={actor.id}
                image={API.getPoster(actor.profile_path)}
                name={actor.name}
                character={actor.character}
              />
            );
          })}
        </div>
      </section>
    </main>
  )
}
