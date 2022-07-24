import './MoviesCardList.css';
import {  useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ movies }) {
  const location = useLocation();

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__wrap">
        { movies.map((movie) => {
          return <MoviesCard movie={movie} key={movie.id} />
        })}
      </div>

      { location.pathname === "/movies" && movies.length > 1 &&
        <button className="movies-card-list__more-btn">Ещё</button>
      }
    </section>
  );
}
