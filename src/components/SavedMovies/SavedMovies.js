import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function SavedMovies({ onNavPopup }) {
  return (
    <>
      <Header onNavPopup={onNavPopup} />
      <main className="saved-movies">
        <SearchForm />
        <MoviesCardList />
        <Preloader/>
      </main>
      <Footer />
    </>
  );
}

