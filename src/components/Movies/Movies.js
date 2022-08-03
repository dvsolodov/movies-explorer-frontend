import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { useEffect, useState, useContext } from 'react';
import { ls } from '../../utils/LocalStorage';
import { filterSearch, markSavedMovies } from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Movies({ onNavPopup }) {
  const currentUser = useContext(CurrentUserContext);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [formData, setFormData] = useState(ls.getData(currentUser._id + 'formDataMovies'));
  const [movies, setMovies] = useState(getMovies());

  function getMovies() {
    const allMovies = ls.getData(currentUser._id + 'movies');
    const moviesSearch = ls.getData(currentUser._id + "moviesSearch");

    if (moviesSearch.length === 0) {
      return allMovies;
    } else {
      return moviesSearch;
    }
  }

  useEffect(() => {
    const allMovies = ls.getData(currentUser._id + 'movies');

    if (allMovies.length === 0) {
      const token = localStorage.getItem("_token");
      if (token) {
        setIsLoaded(false);
        moviesApi.getMovies()
          .then(result => {
            ls.setData(currentUser._id + "movies", result);

          mainApi.getMovies(token)
            .then(result => {
              ls.setData(currentUser._id + "savedMovies", result);
              const moviesLs = ls.getData(currentUser._id + "movies");
              const handelesMovies = markSavedMovies(moviesLs, result);

              ls.removeData(currentUser._id + "movies");
              ls.setData(currentUser._id + "movies", handelesMovies);

              setMovies(handelesMovies);
              setIsLoaded(true);
            })
            .catch((err) => {
              console.log(err);
              setError(true);
            });
          })
          .catch((err) => {
            console.log(err);
            setError(true);
          });
      } else {
        console.log("Необходима авторизация");
      }
    }
  }, []);

  const handleSubmit = ({searchText, isShorted}) => {
    setIsLoaded(false);
    setFormData({searchText, isShorted});

    const moviesLs = ls.getData(currentUser._id + "movies");
    const filteredData = filterSearch(moviesLs, searchText, isShorted);

    if (!filteredData) {
      setError(true);
      setIsLoaded(true);
      return;
    }

    ls.removeData(currentUser._id + "moviesSearch");
    ls.setData(currentUser._id + "moviesSearch", filteredData);
    ls.removeData(currentUser._id + "formDataMovies");
    ls.setData(currentUser._id + "formDataMovies", {searchText, isShorted});

    setMovies(filteredData);
    setIsLoaded(true);
  }

  return (
    <>
      <Header onNavPopup={onNavPopup} />
      <main className="movies">
        <SearchForm onSubmit={handleSubmit} storageData={formData} />
        { isLoaded && <MoviesCardList movies={movies} error={error} /> }
        { !isLoaded && <Preloader/> }
      </main>
      <Footer />
    </>
  );
}
