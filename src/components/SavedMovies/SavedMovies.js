import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm />
      <Preloader/>
      <MoviesCardList />
    </main>
  );
}

