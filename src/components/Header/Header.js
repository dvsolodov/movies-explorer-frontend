import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

export default function Header({ onNavPopup }) {
  return (
    <header className="header">
      <Logo />
      <Navigation onNavPopup={onNavPopup} />
    </header>
  );
}
