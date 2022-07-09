import './NavTab.css';
import { Link } from 'react-router-dom';

export default function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__items">
        <li className="nav-tab__item">
          <Link className="nav-tab__link" to="/#">
            О проекте
          </Link>
        </li>
        <li className="nav-tab__item nav-tab__item_center">
          <Link className="nav-tab__link" to="/#">
            Технологии
          </Link>
        </li>
        <li className="nav-tab__item">
          <Link className="nav-tab__link" to="/#">
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
}
