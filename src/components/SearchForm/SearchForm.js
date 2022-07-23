import './SearchForm.css';
import { useState } from 'react';
import loupe from '../../images/search-film__loupe-img.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({getFormData}) {
  const [formError, setFormError] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const searchForm = document.getElementById('searchForm');
    const keyWords = searchForm.keyWords.value;
    const isShortedFilm = searchForm.shortFilm.checked;

    if (!isValidatedSearchForm(keyWords)) return;

    getFormData({ keyWords, isShortedFilm });
  }

  function isValidatedSearchForm(inputValue) {
    if (!inputValue.trim()) {
      setFormError(true);
      return false;
    } else {
      setFormError(false);
      return true;
    }
  }

  return (
    <section className="search-form">
      <form className="search-form__form" id="searchForm" onSubmit={handleSubmit}>
        <div className="search-form__form-wrap">
          <img className="search-form__loupe-img"
            src={loupe}
            alt="Увеличительное стекло"
          ></img>
          <input className="search-form__input"
            type="text"
            placeholder="Фильм"
            name="keyWords"
          ></input>
          <p className={`search-form__error${formError ? "" : " search-form__error_invisible"}`}>Нужно ввести ключевое слово</p>
          <button className="search-form__submit" type="submit"></button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}
