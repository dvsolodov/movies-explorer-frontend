import './App.css';
import { useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import NavPopup from '../NavPopup/NavPopup';

function App() {
  const [isNavPopupOpen, setIsNavPopupOpen] = useState(false);

  function handleNavPopupClick() {
    setIsNavPopupOpen(true);
  }

  function closePopup() {
    setIsNavPopupOpen(false);
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main onNavPopup={handleNavPopupClick} />} />
        <Route path="/movies" element={<Movies onNavPopup={handleNavPopupClick} />} />
        <Route path="/saved-movies" element={<SavedMovies onNavPopup={handleNavPopupClick} />} />
        <Route path="/profile" element={<Profile onNavPopup={handleNavPopupClick} />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <NavPopup isOpen={isNavPopupOpen} onClose={closePopup} />

    </div>
  );
}

export default App;
