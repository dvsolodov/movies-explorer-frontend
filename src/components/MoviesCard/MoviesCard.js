import './MoviesCard.css';
import { useEffect, useState, useContext } from 'react';
import {  useLocation } from 'react-router-dom';
import { formatTime } from '../../utils/utils';
import whiteLikeImg from '../../images/movies-card__white-like.svg';
import redLikeImg from '../../images/movies-card__red-like.svg';
import delImg from '../../images/saved-movies__delete.svg';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { ls } from '../../utils/LocalStorage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function MoviesCard({ movie }) {
  const currentUser = useContext(CurrentUserContext);
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
      if (movie.savedMovie === "") {
        setBtnImg(whiteLikeImg);
        setAlt('Добавить в сохраненные')
      } else {
        setBtnImg(redLikeImg);
        setAlt("Удалить из сохраненных");
      }
    } else {
      setBtnImg(delImg);
      setAlt("Удалить из сохраненных");
    }
  }, [locPath]);

  function handleClick(e) {
    e.preventDefault()

    if (locPath === "/movies") {
      if (btnImg === whiteLikeImg) {
        saveMovie(movie);
      } else {
        deleteMovie(movie.savedMovie);
      }
    } else {
      deleteMovie(movie._id);
      e.target.closest(".movies-card").remove();
    }
  }

  function deleteMovie(movieId) {
    const token = localStorage.getItem("_token");
    if (token !== null) {
      mainApi.deleteMovie(token, movieId)
        .then((result) => {
          if (result.message !== "Фильм удален") {
            throw new Error(result.message);
          }

          const movies = ls.getData(currentUser._id + "movies");
          const savedMovies = ls.getData(currentUser._id + "savedMoviesSearch");

          movies.forEach((mvi) => {
            if (locPath === "/movies") {
              if (movie.id.toString() === mvi.id.toString()) {
                mvi.savedMovie = "";
              }
            } else {
              if (movie.movieId.toString() === mvi.id.toString()) {
                mvi.savedMovie = "";
              }
            }
          });

          savedMovies.forEach((mvi, index, arr) => {
            if (locPath === "/movies") {
              if (movie.id.toString() === mvi.movieId.toString()) {
                arr.splice(index, 1);
              }
            } else {
              if (movie.movieId.toString() === mvi.movieId.toString()) {
                arr.splice(index, 1);
              }
            }
          });

          ls.removeData(currentUser._id + "savedMoviesSearch");
          ls.setData(currentUser._id + "savedMoviesSearch", savedMovies);
          ls.removeData(currentUser._id + "movies");
          ls.setData(currentUser._id + "movies", movies);

          setBtnImg(whiteLikeImg);
          setAlt('Добавить в сохраненные')
        })
        .catch(err => console.log(err));
    }
  }

  function saveMovie(movie) {
    const token = localStorage.getItem("_token");
    if (token !== null) {
      const country = movie.country === null ? 'нет' : movie.country;
      const nameEN = movie.nameEN === null || movie.nameEN === "" ? 'нет' : movie.nameEN;
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
        nameEN,
        thumbnail: thumbnail,
        movieId: movie.id,
      };

      mainApi.saveMovie(token, data)
        .then((result) => {
          const movies = ls.getData(currentUser._id + "movies");

          movies.forEach((mvi) => {
            if (result.movieId.toString() === mvi.id.toString()) {
              mvi.savedMovie = result._id;
            }
          });

          ls.removeData(currentUser._id + "movies");
          ls.setData(currentUser._id + "movies", movies);

          setBtnImg(redLikeImg);
          setAlt('Удалить из сохраненные')
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
