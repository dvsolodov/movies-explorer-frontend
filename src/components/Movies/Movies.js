import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { moviesApi } from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';

export default function Movies({ onNavPopup }) {
  const [formData, setFormData] = useState({});
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // render the page if there is data in localStorage
  /*
  useEffect(() => {
    console.log(`keyWords ${keyWords}`);
    console.log(`isShortFilm ${isShortFilm}`);
    console.log(`movies ${movies}`);
  }, []);
  */

  useEffect(() => {
    setIsLoaded(false);
    getAllMovies();
    console.log(formData);
    console.log(movies);
  }, [formData]);

  function handleFormData({ keyWords, isShortedFilm }) {
    setFormData({ keyWords, isShortedFilm });
  }

  function getAllMovies() {
    moviesApi.getMovies()
      .then((allMovies) => {
        setMovies(allMovies);
        setIsLoaded(true);
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Header onNavPopup={onNavPopup} />
      <main className="movies">
        <SearchForm getFormData={handleFormData} />
        { isLoaded && <MoviesCardList movies={movies} /> }
        { !isLoaded && <Preloader/> }
      </main>
      <Footer />
    </>
  );
}
