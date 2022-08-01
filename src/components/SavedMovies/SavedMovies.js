import './SavedMovies.css';
import { useState, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { filterSavedMovies } from '../../utils/utils';
import { ls } from '../../utils/LocalStorage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function SavedMovies({ onNavPopup }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLoaded, setIsLoaded] = useState(true);
  const [movies, setMovies] = useState(ls.getData(currentUser._id + 'savedMovies'));
  const formData = { searchText: "", isShorted: false};

  function handleSubmit({searchText, isShorted}) {
    setIsLoaded(false);
    const filteredData = filterSavedMovies(movies, searchText, isShorted);
    setMovies(filteredData);
    setIsLoaded(true);
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

