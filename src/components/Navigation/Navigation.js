import './Navigation.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import hamburger from '../../images/navigation__hamburger.svg'
import SiteNav from '../SiteNav/SiteNav';
import UserNav from '../UserNav/UserNav';

export default function Navigation({ onNavPopup }) {
  const location = useLocation();
  const [locPath, setLocPath] = useState(location.pathname);
  const [windowWidth, setWindiwWidth] = useState(window.innerWidth);
  let [isUser, setIsUser] = useState(locPath === '/' ? false: true);

  useEffect(() => {
    setLocPath(location.pathname);

    if (locPath === '/') {
      setIsUser(false);
    } else {
      setIsUser(true);
    }

    window.addEventListener("resize", function () {
      setWindiwWidth(window.innerWidth);
    });
  }, [windowWidth, locPath]);

  return (
    <nav className="navigation">
      { isUser &&
        <div className="navigation__wrap_site-nav">
          <SiteNav />
        </div>
      }

      { ((windowWidth > 1280 && isUser) || !isUser) &&
        <div className="navigation__wrap_user-nav">
          <UserNav isUser={isUser} />
        </div>
      }

      { windowWidth < 1279 && isUser &&
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
