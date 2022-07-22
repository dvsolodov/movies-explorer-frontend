import './NavTab.css';
import { Link } from "react-scroll";

export default function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__items">
        <li className="nav-tab__item">
          <Link className="nav-tab__link"
            to="about-project"
            smooth={true}
          >
            О проекте
          </Link>
        </li>
        <li className="nav-tab__item nav-tab__item_center">
          <Link className="nav-tab__link"
            to="techs"
            smooth={true}
          >
            Технологии
          </Link>
        </li>
        <li className="nav-tab__item">
          <Link className="nav-tab__link"
            to="about-me"
            smooth={true}
          >
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
}
