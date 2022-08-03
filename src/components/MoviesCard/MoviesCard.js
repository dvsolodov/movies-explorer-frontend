import './MoviesCard.css';
import { useEffect, useState, useContext } from 'react';
import {  useLocation } from 'react-router-dom';
import { formatTime } from '../../utils/utils';
import whiteLikeImg from '../../images/movies-card__white-like.svg';
import redLikeImg from '../../images/movies-card__red-like.svg';
import delImg from '../../images/saved-movies__delete.svg';
import { mainApi } from '../../utils/MainApi';
import { ls } from '../../utils/LocalStorage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function MoviesCard({ movie }) {
  const currentUser = useContext(CurrentUserContext);
  const baseUrl = "https://api.nomoreparties.co";
  const location = useLocation();
  const locPath = location.pathname;
  const [alt, setAlt] = useState('Добавить в сохраненные');
  const like_class = 'movies-card__like';
  const del_class = 'movies-card__del';
  const pathToImage = location.pathname === "/movies" ? baseUrl + movie.image.url : movie.image;
  const [btnImg, setBtnImg] = useState();

  useEffect(() => {
    console.log(movie);
    if (locPath === "/movies") {
      if (movie.savedMovie === "") {
        setAlt('Добавить в сохраненные')
        setBtnImg(whiteLikeImg);
      } else {
        setAlt("Удалить из сохраненных");
        setBtnImg(redLikeImg);
      }
    } else {
      setAlt("Удалить из сохраненных");
      setBtnImg(delImg);
    }
  });

  function handleClick(e) {
    e.preventDefault()

    if (locPath === "/movies") {
      if (btnImg === whiteLikeImg) {
        saveMovie(movie);
      } else {
        deleteMovie(movie.savedMovie);
      }
    } else {
      deleteMovie(movie.savedMovie);
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

          movie.savedMovie = "";

          const moviesLs = ls.getData(currentUser._id + "movies");
          const moviesSearchLs = ls.getData(currentUser._id + "moviesSearch");
          const savedMoviesLs = ls.getData(currentUser._id + "savedMovies");

          moviesLs.forEach((mvi) => {
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

          moviesSearchLs.forEach((mvi) => {
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

          savedMoviesLs.forEach((mvi, index, arr) => {
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

          ls.removeData(currentUser._id + "savedMovies");
          ls.setData(currentUser._id + "savedMovies", savedMoviesLs);
          ls.removeData(currentUser._id + "movies");
          ls.setData(currentUser._id + "movies", moviesLs);
          ls.removeData(currentUser._id + "moviesSearch");
          ls.setData(currentUser._id + "moviesSearch", moviesSearchLs);

          setBtnImg(whiteLikeImg);
          setAlt('Добавить в сохраненные')
        })
        .catch(err => console.log(err));
    }
  }

  function saveMovie(movie) {
    const token = localStorage.getItem("_token");
    if (token !== null) {
      const moviesLs = ls.getData(currentUser._id + "movies");
      const moviesSearchLs = ls.getData(currentUser._id + "moviesSearch");
      const savedMoviesLs = ls.getData(currentUser._id + "savedMovies");
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

      try {
        savedMoviesLs.forEach((mvi, index, arr) => {
          if (data.movieId.toString() === mvi.movieId.toString()) {
            throw new Error("Такой фильм уже сохранен");
          }
        });

        mainApi.saveMovie(token, data)
          .then((result) => {

            movie.savedMovie = result._id;

            moviesLs.forEach((mvi) => {
              if (movie.id.toString() === mvi.id.toString()) {
                mvi.savedMovie = result._id;
              }
            });

            moviesSearchLs.forEach((mvi) => {
              if (movie.id.toString() === mvi.id.toString()) {
                mvi.savedMovie = result._id;
              }
            });

            data.savedMovie = result._id;
            savedMoviesLs.push(data);

            ls.removeData(currentUser._id + "movies");
            ls.setData(currentUser._id + "movies", moviesLs);
            ls.removeData(currentUser._id + "moviesSearch");
            ls.setData(currentUser._id + "moviesSearch", moviesSearchLs);
            ls.removeData(currentUser._id + "savedMovies");
            ls.setData(currentUser._id + "savedMovies", savedMoviesLs);

            setBtnImg(redLikeImg);
            setAlt('Удалить из сохраненные')
          });
      } catch(err) {
        console.log(err);
        return;
      }
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
