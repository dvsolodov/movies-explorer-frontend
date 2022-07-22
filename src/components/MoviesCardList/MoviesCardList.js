import './MoviesCardList.css';
import {  useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import img1 from '../../images/card_1.png';
import img2 from '../../images/card_2.png';

export default function MoviesCardList() {
  const location = useLocation();

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__wrap">
        <MoviesCard img={img1} title='card 1' duration='1:25' />
        <MoviesCard img={img2} title='card 2' duration='1:25' />
        <MoviesCard img={img1} title='card 1' duration='1:25' />
        <MoviesCard img={img2} title='card 2' duration='1:25' />
        <MoviesCard img={img1} title='card 1' duration='1:25' />
        <MoviesCard img={img1} title='card 1' duration='1:25' />
        <MoviesCard img={img2} title='card 2' duration='1:25' />
      </div>

      { location.pathname === "/movies" &&
        <button className="movies-card-list__more-btn">Ещё</button>
      }
    </section>
  );
}
