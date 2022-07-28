import './MoviesCard.css';
import { useEffect, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import { formatTime } from '../../utils/utils';
import whiteLikeImg from '../../images/movies-card__white-like.svg';
import redLikeImg from '../../images/movies-card__red-like.svg';
import delImg from '../../images/saved-movies__delete.svg';
import { mainApi } from '../../utils/MainApi';

export default function MoviesCard({ movie }) {
  const baseUrl = "https://api.nomoreparties.co";
  const location = useLocation();
  const locPath = location.pathname;
  const [btnImg, setBtnImg] = useState();
  const [alt, setAlt] = useState('Добавить в сохраненные');
  const like_class = 'movies-card__like';
  const del_class = 'movies-card__del';
  const pathToImage = location.pathname === "/movies" ? baseUrl + movie.image.url : movie.image;

  useEffect(()=> {
    if (locPath === "/movies") {
      setBtnImg(whiteLikeImg);
    } else {
      setBtnImg(delImg);
      setAlt("Удалить из сохраненных");
    }
  }, [locPath]);

  function handleClick() {
    if (locPath === "/movies") {
      if (btnImg === whiteLikeImg) {
        saveMovie(movie);
        setAlt('Удалить из сохраненных')
      } else {
        setBtnImg(whiteLikeImg);
        setAlt('Добавить в сохраненные')
      }
    }
  }

  function saveMovie(movie) {
    const token = localStorage.getItem("_token");
    if (token !== null) {
      const country = movie.country === null ? 'нет' : movie.country;
      const image = baseUrl + movie.image.url;
      const thumbnail = baseUrl + movie.image.formats.thumbnail.url;
      const data = {
        country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: thumbnail,
        movieId: movie.id,
      };
      mainApi.saveMovie(token, data)
        .then((result) => {
          setBtnImg(redLikeImg);
        });
    } else {
      console.log('Что-то пошло не так...');
    }
  }

  function toggleBtnClass() {
    if (btnImg === delImg) {
      return del_class;
    }

    return like_class;
  }

  return (
    <section className="movies-card">
      <a className="movies-card__link" href={movie.trailerLink} target="_blank" rel="noreferrer" title={movie.nameRU}>
        <img className="movies-card__img"
          src={pathToImage}
          alt={movie.nameRU}
        ></img>
      </a>
      <div className="movies-card__wrap">
        <h2 className="movies-card__title" title={movie.nameRU}>{movie.nameRU}</h2>
        <button className="movies-card__button" title={alt} onClick={handleClick}>
          <img className={toggleBtnClass()}
            src={btnImg}
            alt={alt}
          ></img>
        </button>
      </div>
      <p className="movies-card__duration">{formatTime(movie.duration)}</p>
    </section>
  );
}
