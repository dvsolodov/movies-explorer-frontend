import './SavedMovies.css';
import { useState, useEffect, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { filterSavedMovies } from '../../utils/utils';
import { mainApi } from '../../utils/MainApi';
import { ls } from '../../utils/LocalStorage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function SavedMovies({ onNavPopup }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLoaded, setIsLoaded] = useState(true);
  const [formData, setFormData] = useState(ls.getData(currentUser._id + 'formDataSavedMovies'));
  const [movies, setMovies] = useState(ls.getData(currentUser._id + 'savedMoviesSearch'));

  useEffect(() => {
    ls.setData('formDataSavedMovies', formData);
  }, [formData]);

  function handleSubmit({searchText, isShorted}) {
    setIsLoaded(false);
    setFormData({searchText, isShorted});
    ls.setData(currentUser._id + "formDataSavedMovies", {searchText, isShorted});
    getMovies();
  }

  function getMovies() {
    const token = localStorage.getItem('_token');
    if (token !== null) {
      mainApi.getMovies(token)
        .then((result) => {
          const formData = ls.getData(currentUser._id + "formDataSavedMovies");
          const filteredMovies = filterSavedMovies(result, formData.searchText, formData.isShorted);

          ls.setData(currentUser._id + "savedMoviesSearch", filteredMovies);
          setMovies(filteredMovies);
          setIsLoaded(true);
        });
    }
  }

  return (
    <>
      <Header onNavPopup={onNavPopup} />
      <main className="saved-movies">
        <SearchForm onSubmit={handleSubmit} storageData={formData} />
        { isLoaded && <MoviesCardList movies={movies} /> }
        { !isLoaded && <Preloader/> }
      </main>
      <Footer />
    </>
  );
}

