import './Navigation.css';
import hamburger from '../../images/navigation__hamburger.svg'
import SiteNav from '../SiteNav/SiteNav';
import UserNav from '../UserNav/UserNav';

export default function Navigation({ onNavPopup }) {
  const user = true;

  return (
    <nav className="navigation">
      { user &&
        <div className="navigation__wrap_site-nav">
          <SiteNav />
        </div>
      }

      <div className="navigation__wrap_user-nav">
        <UserNav isUser={user} />
      </div>

      { user &&
        <button className="navigation__hamburger-btn" onClick={onNavPopup}>
          <img className="navigation__hamburger-img"
            src={ hamburger }
            alt="Кнопка открытия панели навигации"
          ></img>
        </button>
      }
    </nav>
  );
}
