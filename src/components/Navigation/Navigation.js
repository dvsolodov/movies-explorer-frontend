import './Navigation.css';
import SiteNav from '../SiteNav/SiteNav';
import UserNav from '../UserNav/UserNav';

export default function Navigation() {
  return (
    <nav className="navigation">
      <SiteNav />
      <UserNav />
    </nav>
  );
}
