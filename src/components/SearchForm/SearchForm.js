import './SearchForm.css';
import btnImg from '../../images/search-film__submit-btn-img.svg';
import loupe from '../../images/search-film__loupe-img.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__form-wrap">
          <img className="search-form__loupe-img"
            src={loupe}
            alt="Увеличительное стекло"
          ></img>
          <input className="search-form__input"
            type="text"
            placeholder="Фильм"
            required
          ></input>
          <button className="search-form__submit" type="submit"></button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}
