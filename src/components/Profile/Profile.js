import './Profile.css';
import { useState, useContext, useEffect } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';
import { ls } from '../../utils/LocalStorage';
import { NamePattern, EmailPattern } from '../../utils/constants';


export default function Profile({ onNavPopup, setLoggedIn, setCurrentUser }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);
  const [isEdit, setIsEdit] = useState(false);
  const [editMsg, setEditMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (userName === currentUser.name && userEmail === currentUser.email) {
      setDisabled(true);
      setEditMsg("Данные не изменены");
    } else {
      setDisabled(false);
      setEditMsg("");
    }
  }, [userName, userEmail]);

  useEffect(() => {
      setDisabled(false);
      setEditMsg("");
  }, [])

  function handleNameInputChange(e) {
    const input = e.target;
    setUserName(input.value);
  }

  function handleEmailInputChange(e) {
    const input = e.target;
    setUserEmail(input.value);
  }

  function handleClickExitButton() {
    setLoggedIn(false);
    localStorage.removeItem('_token');
    ls.removeData(currentUser._id + "formDataMovies");
    ls.removeData(currentUser._id + "formDataSavedMovies");
    ls.removeData(currentUser._id + "savedMovies");
    ls.removeData(currentUser._id + "savedMoviesSearch");
    ls.removeData(currentUser._id + "movies");
    setCurrentUser({});
    navigate("../signin", { replace: true});
  }

  function handleAClickEditButton(e) {
    e.preventDefault();

    setIsEdit(true);
  }

  function handleAClickSaveButton(e) {
    e.preventDefault();

    const elems = document.forms.editForm.elements;
    const token = localStorage.getItem("_token");
    const nameEl = elems.name;
    const emailEl = elems.email;
    const data = {name: nameEl.value, email: emailEl.value};

    console.log('email  bad ' + nameEl.validationMessage);

    if (!nameEl.validity.valid || !emailEl.validity.valid) {
      if (!nameEl.validity.valid) {
        setEditMsg("Имя должно состоять из 2-30 символов латиницы, кириллицы, пробелов или дефисов");
      }

      if (!emailEl.validity.valid) {
        setEditMsg("Введите корректный адрес электронной почты");
      }

      return;
    }

    if (nameEl.value === currentUser.name && emailEl.value === currentUser.email) {
      setDisabled(true);
      setEditMsg("Данные не изменены");
      return;
    }

    mainApi.updateUser(token, data)
      .then((response) => {
        if (response.ok) {
          showSuccessMsg();
        }

        setIsEdit(false);
        setUserName(data.name);
        setUserEmail(data.email);
        setCurrentUser({...Object, name: data.name, email: data.email});
      });
  }

  function showSuccessMsg() {
    setSuccessMsg("Данные профиля успешно изменены");
    setTimeout(setSuccessMsg, 3000, "");
  }

  return (
    <>
      <Header onNavPopup={onNavPopup} />
      <main className="profile">
        <form className="profile__form" name="editForm">
          <h2 className="profile__hello">Привет, {currentUser.name}!</h2>
          <label className="profile__field">
            <p className="profile__field-title">Имя</p>
            <input className="profile__field-data"
              pattern={NamePattern}
              minLength="2"
              maxLength="30"
              value={userName}
              onChange={handleNameInputChange}
              name="name"
              readOnly={isEdit ? false : true}
            />
          </label>
          <label className="profile__field">
            <p className="profile__field-title">Email</p>
            <input className="profile__field-data"
              pattern={EmailPattern}
              type="email"
              value={userEmail}
              onChange={handleEmailInputChange}
              name="email"
              readOnly={isEdit ? false : true}
            />
          </label>
        </form>
        <div className="profile__actions">
          <div className={`profile__actions-wrap${!isEdit ? " profile__action_invisible" : ""}`}>
            <p className={`profile__action__edit-msg${editMsg === "" ? " profile__action_invisible" : ""}`}>{editMsg}</p>
            <button className={`profile__action profile__action_save${isEdit ? "" : " profile__action_invisible"}`}
              onClick={handleAClickSaveButton}
              disabled={disabled}
            >Сохранить</button>
          </div>

          <div className={`profile__actions-wrap${isEdit ? " profile__action_invisible" : ""}`}>
            <p className={`profile__action__edit-msg p profile__action__edit-msg_success${successMsg === "" ? " profile__action_invisible" : ""}`}>
              {successMsg}
            </p>
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
