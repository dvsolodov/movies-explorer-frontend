import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { moviesApi } from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';

export default function Movies({ onNavPopup }) {
  let [formData, setFormData] = useState();
  let [movies, setMovies] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  // render the page if there is data in localStorage
  useEffect(() => {
    setIsLoaded(false);
    const formData = JSON.parse(localStorage.getItem('formDataMovies'));
    const movies = JSON.parse(localStorage.getItem('movies'));
    formData ? setFormData(formData) : setFormData({});
    movies ? setMovies(movies) : setMovies([]);
    setIsLoaded(true);
  }, []);

  function handleFormData({ keyWords, isShortedFilm }) {
    setIsLoaded(false);
    localStorage.setItem('formDataMovies', JSON.stringify({ keyWords, isShortedFilm }));
    getAllMovies();
  }

  function getAllMovies() {
    moviesApi.getMovies()
      .then((allMovies) => {
        setMovies(allMovies);
        localStorage.setItem('movies', JSON.stringify(allMovies));
        setIsLoaded(true);
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Header onNavPopup={onNavPopup} />
      <main className="movies">
        <SearchForm getFormData={handleFormData} storageData={formData} />
        { isLoaded && <MoviesCardList movies={movies} /> }
        { !isLoaded && <Preloader/> }
      </main>
      <Footer />
    </>
  );
}
