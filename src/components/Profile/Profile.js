import './Profile.css';
import { useState, useContext } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';


export default function Profile({ onNavPopup, setLoggedIn, setCurrentUser }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);
  const [isEdit, setIsEdit] = useState(false);


  function handleNameInputChange(e) {
    setUserName(e.target.value);
  }

  function handleEmailInputChange(e) {
    setUserEmail(e.target.value);
  }

  function handleClickExitButton() {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem('_token');
    navigate("../signin", { replace: true});
  }

  function handleAClickEditButton(e) {
    e.preventDefault();

    const elems = document.forms.editForm.elements;
    const actionsWrap = document.querySelector(".profile__actions-wrap");
    const saveButton = document.querySelector(".profile__action_save");

    setIsEdit(true);
  }

  function handleAClickSaveButton(e) {
    e.preventDefault();

    const elems = document.forms.editForm.elements;
    const token = localStorage.getItem("_token");
    const data = {name: elems.name.value, email: elems.email.value};

    mainApi.updateUser(token, data)
      .then((user) => {
        setIsEdit(false);
        setUserName(data.name);
        setUserEmail(data.email);
        setCurrentUser({...Object, name: data.name, email: data.email});
      });
  }

  return (
    <>
      <Header onNavPopup={onNavPopup} />
      <main className="profile">
        <form className="profile__form" name="editForm">
          <h2 className="profile__hello">Привет, {userName}!</h2>
          <label className="profile__field">
            <p className="profile__field-title">Имя</p>
            <input className="profile__field-data"
              value={userName}
              onChange={handleNameInputChange}
              name="name"
              readOnly={isEdit ? false : true}
            />
          </label>
          <label className="profile__field">
            <p className="profile__field-title">Email</p>
            <input className="profile__field-data"
              value={userEmail}
              onChange={handleEmailInputChange}
              name="email"
              readOnly={isEdit ? false : true}
            />
          </label>
        </form>
        <div className="profile__actions">
          <button className={`profile__action profile__action_save${isEdit ? "" : " profile__action_invisible"}`}
            onClick={handleAClickSaveButton}
          >Сохранить</button>
          <div className={`profile__actions-wrap${isEdit ? " profile__action_invisible" : ""}`}>
            <button className="profile__action"
              onClick={handleAClickEditButton}
            >Редактировать</button>
            <button className="profile__action profile__action_color_red"
              onClick={handleClickExitButton}
            >Выйти из аккаунта</button>
          </div>
        </div>
      </main>
    </>
  );
}
