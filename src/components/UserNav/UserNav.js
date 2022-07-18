import './UserNav.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function UserNav({ isUser }) {
  const location = useLocation();
  const locPath = location.pathname;

  return (
    <ul className="user-nav">
      { locPath === '/' &&
        <li className="user-nav__item">
          <Link className="user-nav__link" to="/signup">
            Регистрация
          </Link>
        </li>
      }
      { locPath === '/' &&
        <li className="user-nav__item">
          <Link className="user-nav__link user-nav__link_enter" to="/signin">
            Войти
          </Link>
        </li>
      }
      { locPath !== '/' &&
        <li className="user-nav__item user-nav__item_account">
          <Link className="user-nav__link user-nav__link_account" to="/profile">
            Аккаунт
          </Link>
        </li>
      }
    </ul>
  );
}
