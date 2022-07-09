import './Navigation.css';
import { Route } from 'react-router-dom';
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
