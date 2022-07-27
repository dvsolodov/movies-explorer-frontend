import './App.css';
import { useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import NavPopup from '../NavPopup/NavPopup';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [isNavPopupOpen, setIsNavPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getSavedMovies();
    }
  }, [loggedIn]);

  function handleNavPopupClick() {
    setIsNavPopupOpen(true);
  }

  function closePopup() {
    setIsNavPopupOpen(false);
  }

  function checkToken() {
    const token = localStorage.getItem('_token');
    if (token !== null) {
      mainApi.getUserData(token)
        .then((result) => {
          if (result._id === undefined) {
            setCurrentUser({});
            setLoggedIn(false);
            localStorage.removeItem('_token');
          } else {
            setCurrentUser(result);
            setLoggedIn(true);
          }
        });
    }
  }

  function getSavedMovies() {
    const token = localStorage.getItem('_token');
    console.log(token);
    if (token !== null) {
      mainApi.getMovies(token)
        .then((result) => {
          localStorage.setItem('savedMovies', JSON.stringify(result));
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={loggedIn}>
        <div className="app">
          <Routes>
            <Route path="/" element={<Main onNavPopup={handleNavPopupClick} />} />
            <Route path="/movies" element={
              <ProtectedRoute>
                <Movies onNavPopup={handleNavPopupClick} />
              </ProtectedRoute>
            } />
            <Route path="/saved-movies" element={
              <ProtectedRoute>
                <SavedMovies onNavPopup={handleNavPopupClick} />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile onNavPopup={handleNavPopupClick}
                  setLoggedIn={setLoggedIn}
                  setCurrentUser={setCurrentUser}
                />
              </ProtectedRoute>
            } />
            <Route path="/signin" element={<Login setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />} />
            <Route path="/signup" element={<Register setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <NavPopup isOpen={isNavPopupOpen} onClose={closePopup} />

        </div>
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
