import './MoviesCard.css';
import { useEffect, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import likeImg1 from '../../images/movies-card__white-like.svg';
import likeImg2 from '../../images/movies-card__red-like.svg';
import del from '../../images/saved-movies__delete.svg';

export default function MoviesCard({ img, title, duration }) {
  const items = [likeImg1, likeImg2];
  const item = items[Math.floor(Math.random()*items.length)];
  const location = useLocation();
  const [like, setLike] = useState('');
  const [dlt, setDlt] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (location.pathname === "/movies") {
      setLike(item);
      setDlt(false);
      setAlt('Нравится');
    } else {
      setLike(del);
      setDlt(true);
      setAlt('Удалить');
    }
  }, [like, dlt, alt, location.pathname, item]);

  const like_class = 'movies-card__like';
  const del_class = 'movies-card__del';

  return (
    <section className="movies-card">
      <img className="movies-card__img"
        src={img}
        alt={title}
      ></img>
      <div className="movies-card__wrap">
        <h2 className="movies-card__title">{title}</h2>
        <button className="movies-card__button">
          <img className={dlt ? del_class: like_class}
            src={like}
            alt={alt}
          ></img>
        </button>
      </div>
      <p className="movies-card__duration">{duration}</p>
    </section>
  );
}
