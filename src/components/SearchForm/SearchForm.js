import './SearchForm.css';
import { useState } from 'react';
import loupe from '../../images/search-film__loupe-img.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({ onSubmit, storageData }) {
  const [formError, setFormError] = useState();

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const searchText = form.keyWords.value;
    const isShorted = form.shortFilm.checked;

    if (!validateSearchForm(searchText)) return;

    onSubmit({ searchText, isShorted });
  }

  function validateSearchForm(inputValue) {
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
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__form-wrap">
          <img className="search-form__loupe-img"
            src={loupe}
            alt="Увеличительное стекло"
          ></img>
          <input className="search-form__input"
            type="text"
            placeholder="Фильм"
            name="keyWords"
            defaultValue={storageData ? storageData.searchText: ""}
          ></input>
          <p className={`search-form__error${formError ? "" : " search-form__error_invisible"}`}>
            Нужно ввести ключевое слово
          </p>
          <button className="search-form__submit" type="submit"></button>
        </div>
        <FilterCheckbox isChecked={storageData ? storageData.isShorted: false} />
      </form>
    </section>
  );
}
