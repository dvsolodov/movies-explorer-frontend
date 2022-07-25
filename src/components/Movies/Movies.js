import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { moviesApi } from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';

export default function Movies({ onNavPopup }) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [formData, setFormData] = useState(getFormDataFromStorage());
  const [movies, setMovies] = useState(getMoviesFromStorage());

  useEffect(() => {
    setFormDataToStorage(formData);
  }, [formData]);

  useEffect(() => {
    setMoviesToStorage(movies);
  }, [movies]);

  function handleSubmit({searchText, isShorted}) {
    setIsLoaded(false);
    setFormData({searchText, isShorted});
    getMovies();
  }

  function getMovies() {
    moviesApi.getMovies()
      .then((movies) => {
        let mvs = movies;
        const searchText = getFormDataFromStorage().searchText;

        if (getFormDataFromStorage().isShorted) {
          mvs = filterMoviesByTime(movies);
        }

        setMovies(filterMoviesBySearchText(mvs, searchText));
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  function filterMoviesByTime(movies) {
    return movies.filter((movie) => {
      return movie.duration <= 40;
    });
  }

  function filterMoviesBySearchText(movies, searchText) {
    return movies.filter((movie) => {
      const str = `${movie.nameRU} ${movie.nameEN} ${movie.description}`;
      return str.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  function setFormDataToStorage(formData) {
    localStorage.setItem("formDataMovies", JSON.stringify(formData));
  }

  function setMoviesToStorage(movies) {
    localStorage.setItem("movies", JSON.stringify(movies));
  }

  function getFormDataFromStorage() {
    const data = JSON.parse(localStorage.getItem("formDataMovies"));

    if (data === null) {
      return {};
    }

    return data;
  }

  function getMoviesFromStorage() {
    const data = JSON.parse(localStorage.getItem("movies"));

    if (data === null) {
      return [];
    }

    return data;
  }

  return (
    <>
      <Header onNavPopup={onNavPopup} />
      <main className="movies">
        <SearchForm onSubmit={handleSubmit} storageData={formData} />
        { isLoaded && <MoviesCardList movies={movies} /> }
        { !isLoaded && <Preloader/> }
      </main>
      <Footer />
    </>
  );
}
