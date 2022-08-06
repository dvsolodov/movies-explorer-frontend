import './SiteNav.css';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function SiteNav() {
  const location = useLocation();
  const locPath = location.pathname;

  return (
    <ul className="site-nav">
      <li className="site-nav__item">
        <Link className={`site-nav__link site-nav__link_main${locPath === "/" ? " site-nav__item_active" : ""}`} to="/">
          Главная
        </Link>
      </li>
      <li className={`site-nav__item${locPath === "/movies" ? " site-nav__item_active" : ""}`}>
        <NavLink className="site-nav__link" to="/movies">
          Фильмы
        </NavLink>
      </li>
      <li className={`site-nav__item${locPath === "/saved-movies" ? " site-nav__item_active" : ""}`}>
        <NavLink className="site-nav__link" to="/saved-movies">
          Сохранённые фильмы
        </NavLink>
      </li>
    </ul>
  );
}
