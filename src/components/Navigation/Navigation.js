import './Navigation.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import hamburger from '../../images/navigation__hamburger.svg'
import SiteNav from '../SiteNav/SiteNav';
import UserNav from '../UserNav/UserNav';
import { LoggedInContext } from '../../contexts/LoggedInContext';

export default function Navigation({ onNavPopup }) {
  const loggedIn = useContext(LoggedInContext);
  const location = useLocation();
  const [locPath, setLocPath] = useState(location.pathname);
  const [windowWidth, setWindiwWidth] = useState(window.innerWidth);

  useEffect(() => {
    setLocPath(location.pathname);

    window.addEventListener("resize", function () {
      setWindiwWidth(window.innerWidth);
    });
  }, [windowWidth, location.pathname]);

  return (
    <nav className="navigation">
      { loggedIn &&
        <div className="navigation__wrap_site-nav">
          <SiteNav />
        </div>
      }

      { ((windowWidth > 1280 && loggedIn) || !loggedIn) &&
        <div className="navigation__wrap_user-nav">
          <UserNav />
        </div>
      }

      { windowWidth < 1279 && loggedIn &&
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
