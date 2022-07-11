import './UserNav.css';
import { Link } from 'react-router-dom';

export default function UserNav() {
  return (
    <ul className="user-nav">
      <li className="user-nav__item">
        <Link className="user-nav__link" to="/register">
          Регистрация
        </Link>
      </li>
      <li className="user-nav__item">
        <Link className="user-nav__link user-nav__link_enter" to="/login">
          Войти
        </Link>
      </li>
      <li className="user-nav__item">
        <Link className="user-nav__link user-nav__link_account" to="/profile">
          Аккаунт
        </Link>
      </li>
    </ul>
  );
}
