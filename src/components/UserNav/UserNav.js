import './UserNav.css';
import { Link } from 'react-router-dom';

export default function UserNav({ isUser }) {

  return (
    <ul className="user-nav">
      { !isUser &&
        <li className="user-nav__item">
          <Link className="user-nav__link" to="/signup">
            Регистрация
          </Link>
        </li>
      }

      { !isUser &&
        <li className="user-nav__item">
          <Link className="user-nav__link user-nav__link_enter" to="/signin">
            Войти
          </Link>
        </li>
      }

      { isUser &&
        <li className="user-nav__item user-nav__item_account">
          <Link className="user-nav__link user-nav__link_account" to="/profile">
            Аккаунт
          </Link>
        </li>
      }
    </ul>
  );
}
