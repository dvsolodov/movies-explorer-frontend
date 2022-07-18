import './SiteNav.css';
import { Link } from 'react-router-dom';

export default function SiteNav() {
  return (
    <ul className="site-nav">
      <li className="site-nav__item">
        <Link className="site-nav__link site-nav__link_main" to="/">
          Главная
        </Link>
      </li>
      <li className="site-nav__item site-nav__item_active">
        <Link className="site-nav__link site-nav__link_active" to="/movies">
          Фильмы
        </Link>
      </li>
      <li className="site-nav__item">
        <Link className="site-nav__link" to="/saved-movies">
          Сохранённые фильмы
        </Link>
      </li>
    </ul>
  );
}
