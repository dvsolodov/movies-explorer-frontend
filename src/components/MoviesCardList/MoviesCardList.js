import './MoviesCardList.css';
import {  useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState } from 'react';

export default function MoviesCardList({ movies }) {
  const location = useLocation();
  const [allMovies, setAllMovies] = useState(movies);
  const currentPath = location.pathname;
  const [moviesCount, setMoviesCount] = useState(currentPath === "/movies" ? 4 : movies.length - 1);

  function handleClick(e) {
    e.preventDefault();

    setMoviesCount(moviesCount + 4);
  }

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__wrap">
        { allMovies.slice(0, moviesCount).map((movie) => {
          return <MoviesCard movie={movie} key={movie.id} />
        })}
      </div>
      { location.pathname === "/movies" && allMovies.length > 4 && allMovies.length >= moviesCount &&
        <button className="movies-card-list__more-btn" onClick={handleClick}>Ещё</button>
      }
    </section>
  );
}
