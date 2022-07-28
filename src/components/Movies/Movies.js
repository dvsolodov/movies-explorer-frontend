import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { moviesApi } from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';
import { ls } from '../../utils/LocalStorage';
import {
  filterMoviesByTime,
  filterMoviesBySearchText
} from '../../utils/utils';

export default function Movies({ onNavPopup }) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [formData, setFormData] = useState(ls.getData('formDataMovies'));
  const [movies, setMovies] = useState(ls.getData('movies'));

  useEffect(() => {
    ls.setData('formDataMovies', formData);
  }, [formData]);

  useEffect(() => {
    ls.setData('movies', movies);
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
        const searchText = ls.getData('formDataMovies').searchText;

        if (ls.getData('formDataMovies').isShorted) {
          mvs = filterMoviesByTime(movies);
        }

        setMovies(filterMoviesBySearchText(mvs, searchText));
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Header onNavPopup={onNavPopup} />
      <main className="movies">
        <SearchForm onSubmit={handleSubmit} storageData={formData} />
        {console.log(movies)}
        { isLoaded && <MoviesCardList movies={movies} /> }
        { !isLoaded && <Preloader/> }
      </main>
      <Footer />
    </>
  );
}
