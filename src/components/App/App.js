import './App.css';
import { useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import NavPopup from '../NavPopup/NavPopup';
import Footer from '../Footer/Footer';

function App() {
  const location = useLocation();
  const locPath = location.pathname;
  const pageWithHeader = [
    "/", "/movies", "/saved-movies", "/profile",
  ];
  const pageWithFooter = [
    "/", "/movies", "/saved-movies",
  ];

  const [isNavPopupOpen, setIsNavPopupOpen] = useState(false);

  function handleNavPopupClick() {
    setIsNavPopupOpen(true);
  }

  function closePopup() {
    setIsNavPopupOpen(false);
  }

  return (
    <div className="app">
      { pageWithHeader.includes(locPath) &&
        <Header onNavPopup={handleNavPopupClick} />
      }

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      { pageWithFooter.includes(locPath) &&
        <Footer />
      }

      <NavPopup isOpen={isNavPopupOpen} onClose={closePopup} />

    </div>
  );
}

export default App;
