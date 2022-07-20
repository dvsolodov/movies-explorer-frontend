import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Movies({ onNavPopup }) {
  return (
    <>
      <Header onNavPopup={onNavPopup} />
      <main className="movies">
        <SearchForm />
        <MoviesCardList />
        <Preloader/>
      </main>
      <Footer />
    </>
  );
}
