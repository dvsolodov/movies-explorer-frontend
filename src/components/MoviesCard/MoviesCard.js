import './MoviesCard.css';
import { useEffect, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import { formatTime } from '../../utils/utils';
import likeImg1 from '../../images/movies-card__white-like.svg';
import likeImg2 from '../../images/movies-card__red-like.svg';
import del from '../../images/saved-movies__delete.svg';

export default function MoviesCard({ movie }) {
  const baseUrl = "https://api.nomoreparties.co/";
  const location = useLocation();
  const [like, setLike] = useState('');
  const [dlt, setDlt] = useState('');
  const [alt, setAlt] = useState('');
  const like_class = 'movies-card__like';
  const del_class = 'movies-card__del';

  useEffect(() => {
    if (location.pathname === "/movies") {
      setLike(likeImg1);
      setDlt(false);
      setAlt('Нравится');
    } else {
      setLike(likeImg2);
      setDlt(true);
      setAlt('Удалить');
    }
  }, [like, dlt, alt, location.pathname]);

  return (
    <section className="movies-card">
      <a className="movies-card__link" href={movie.trailerLink} target="_blank" rel="noreferrer" title={movie.nameRU}>
        <img className="movies-card__img"
          src={baseUrl + movie.image.url}
          alt={movie.nameRU}
        ></img>
      </a>
      <div className="movies-card__wrap">
        <h2 className="movies-card__title" title={movie.nameRU}>{movie.nameRU}</h2>
        <button className="movies-card__button" onClick={}>
          <img className={dlt ? del_class: like_class}
            src={like}
            alt={alt}
          ></img>
        </button>
      </div>
      <p className="movies-card__duration">{formatTime(movie.duration)}</p>
    </section>
  );
}
