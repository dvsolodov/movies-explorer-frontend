import './Main.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';

function Main() {
  return (
    <main className="content">
      <Header />
      <Promo />
      <AboutProject />
    </main>
  );
}

export default Main;
