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
import { filterMovies } from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Movies({ onNavPopup }) {
  const currentUser = useContext(CurrentUserContext);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [formData, setFormData] = useState(ls.getData(currentUser._id + 'formDataMovies'));
  const [movies, setMovies] = useState(ls.getData(currentUser._id + 'movies'));

  useEffect(() => {
    ls.setData(currentUser._id + "formDataMovies", formData);
  }, [formData]);

  const handleSubmit = ({searchText, isShorted}) => {
    setIsLoaded(false);
    setFormData({searchText, isShorted});
    getMovies();
  }

  const getMovies = () => {
    moviesApi.getMovies()
      .then((movies) => {
        if (movies.message !== undefined) {
          throw new Error(movies.message)
        }

        ls.setData(currentUser._id + "movies", movies);
        getSavedMovies();
      })
        .catch((err) => {
          setError(true);
          console.log(err)
        });
  }

  const getSavedMovies = () => {
    const token = localStorage.getItem("_token");
    if (token !== null) {
      mainApi.getMovies(token)
        .then((result) => {
          if (result.message !== undefined) {
            throw new Error(result.message)
          }

          const mvs = ls.getData(currentUser._id + "movies");
          const formData = ls.getData(currentUser._id + "formDataMovies");
          const filteredData = filterMovies(mvs, result, formData.searchText, formData.isShorted);

          ls.setData(currentUser._id + "savedMovies", result);
          ls.setData(currentUser._id + "movies", filteredData);
          setIsLoaded(true);
          setMovies(filteredData);
        })
        .catch((err) => {
          setError(true);
          console.log(err)
        });
    }
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
