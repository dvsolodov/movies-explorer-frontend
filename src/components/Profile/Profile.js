import './Profile.css';
import { useState, useContext } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useNavigate } from 'react-router-dom';


export default function Profile({ onNavPopup, setLoggedIn, setCurrentUser }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);


  function handleNameInputChange(e) {
    setUserName(e.target.value);
  }

  function handleEmailInputChange(e) {
    setUserEmail(e.target.value);
  }

  function handleClick() {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem('_token');
    navigate("../signin", { replace: true});
  }

  return (
    <>
      <Header onNavPopup={onNavPopup} />
      <main className="profile">
        <form className="profile__form">
          <h2 className="profile__hello">Привет, Виталий!</h2>
          <label className="profile__field">
            <p className="profile__field-title">Имя</p>
            <input className="profile__field-data" value={userName} onChange={handleNameInputChange} />
          </label>
          <label className="profile__field">
            <p className="profile__field-title">Email</p>
            <input className="profile__field-data" value={userEmail} onChange={handleEmailInputChange} />
          </label>
        </form>
        <div className="profile__actions">
          <button className="profile__action">Редактировать</button>
          <button className="profile__action profile__action_color_red" onClick={handleClick}>Выйти из аккаунта</button>
        </div>
      </main>
    </>
  );
}
