import './UserNav.css';
import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LoggedInContext } from '../../contexts/LoggedInContext';

export default function UserNav() {
  const loggedIn = useContext(LoggedInContext);

  return (
    <ul className="user-nav">
      { !loggedIn &&
        <li className="user-nav__item">
          <Link className="user-nav__link" to="/signup">
            Регистрация
          </Link>
        </li>
      }

      { !loggedIn &&
        <li className="user-nav__item">
          <Link className="user-nav__link user-nav__link_enter" to="/signin">
            Войти
          </Link>
        </li>
      }

      { loggedIn &&
        <li className="user-nav__item user-nav__item_account">
          <NavLink className="user-nav__link user-nav__link_account" to="/profile">
            Аккаунт
          </NavLink>
        </li>
      }
    </ul>
  );
}
