import './Profile.css';
import { useState } from 'react';

export default function Profile() {
  const [userName, setUserName] = useState('Денис');
  const [userEmail, setUserEmail] = useState('example@yandex.ru');

  function handleNameInputChange(e) {
    setUserName(e.target.value);
  }

  function handleEmailInputChange(e) {
    setUserEmail(e.target.value);
  }

  return (
    <section className="profile">
      <form className="profile__form">
        <h2 className="profile__hello">Привет, Денис!</h2>
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
        <button className="profile__action profile__action_color_red">Выйти из аккаунта</button>
      </div>
    </section>
  );
}
