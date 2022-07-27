import './SavedMovies.css';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {
  filterMoviesByTime,
  filterMoviesBySearchText
} from '../../utils/utils';
import { mainApi } from '../../utils/MainApi';
import { ls } from '../../utils/LocalStorage';

export default function SavedMovies({ onNavPopup }) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [formData, setFormData] = useState(ls.getData('formDataSavedMovies'));
  const [movies, setMovies] = useState(ls.getData('savedMovies'));

  useEffect(() => {
    ls.setData('formDataSavedMovies', formData);
  }, [formData]);

  useEffect(() => {
    ls.getData('savedMovies', movies);
  }, [movies]);

  function handleSubmit({searchText, isShorted}) {
    setIsLoaded(false);
    setFormData({searchText, isShorted});
    getSavedMovies();
  }

  function getSavedMovies() {
    const token = localStorage.getItem('_token');
    console.log(token);
    if (token !== null) {
      mainApi.getMovies(token)
        .then((result) => {
          let mvs = movies;
          const searchText = ls.getData('formDataSavedMovies').searchText;

          if (ls.getData('formDataSavedMovies').isShorted) {
            mvs = filterMoviesByTime(movies);
          }

          setMovies(filterMoviesBySearchText(mvs, searchText));
          setIsLoaded(true);
        });
    }
  }

  return (
    <>
      <Header onNavPopup={onNavPopup} />
      <main className="saved-movies">
        <SearchForm onSubmit={handleSubmit} storageData={formData} />
        {console.log(movies)}
        { isLoaded && <MoviesCardList movies={movies} /> }
        { !isLoaded && <Preloader/> }
      </main>
      <Footer />
    </>
  );
}

