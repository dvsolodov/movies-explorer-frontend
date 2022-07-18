import './NavPopup.css';
import closeBtnIcon from '../../images/nav-popup__close-icon.svg';
import SiteNav from '../SiteNav/SiteNav';
import UserNav from '../UserNav/UserNav';

export default function NavPopup({ isOpen, onClose }) {
  const isUser = true;

  return (
    <div className={`nav-popup${!isOpen ? "" : " nav-popup_opened"}`}>
      <div className={`nav-popup__container${!isOpen ? "" : " nav-popup__container_opened"}`}>
        <SiteNav isUser={isUser} />
        <UserNav isUser={isUser}/>
        <button className="nav-popup__close-btn" onClick={onClose}>
          <img className="nav-popup__close-icon"
            src={ closeBtnIcon }
            alt="Кнопка закрытия панели навигации"
          ></img>
        </button>
      </div>
    </div>
  );
}
