import './MoviesCardList.css';
import {  useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';

export default function MoviesCardList({ movies, error }) {
  const location = useLocation();
  const [allMovies, setAllMovies] = useState(movies);
  const currentPath = location.pathname;
  const [moviesCount, setMoviesCount] = useState(currentPath === "/movies" ? getRow() : movies.length);
  const [row, setRow] = useState(() => getRow());

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    }
  }, [])

  function handleClick(e) {
    e.preventDefault();

    setMoviesCount(moviesCount + row);
  }

  function handleWindowResize() {
    setRow(getRow());
  }

  function getRow() {
    const windowWidth = document.documentElement.clientWidth;
    let row = 4;

    if (windowWidth >= 768 && windowWidth < 1280) {
      row = 2;
    }

    if (windowWidth >= 320 && windowWidth < 768) {
      row = 5;
    }

    return row;
  }

  function handleMessage() {
    if (error) {
      return `Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз`;
    } else if (!error && movies.length === 0) {
      return "Ничего не найдено";
    }
  }

  return (
    <section className="movies-card-list">
      { !error && movies.length === 0 &&
        <p className="movies-card-list__msg">{handleMessage()}</p>
      }

      { error &&
        <p className="movies-card-list__msg">{handleMessage()}</p>
      }

      <div className="movies-card-list__wrap">
        { !error && allMovies.slice(0, moviesCount).map((movie, index) => {
          return <MoviesCard movie={movie} key={index} />
        })}
      </div>
      { location.pathname === "/movies" && allMovies.length > row && allMovies.length >= moviesCount &&
        <button className="movies-card-list__more-btn" onClick={handleClick}>Ещё</button>
      }
    </section>
  );
}
