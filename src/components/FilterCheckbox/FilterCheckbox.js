import './FilterCheckbox.css';

export default function FilterCheckbox({ isChecked }) {
  return (
    <label className="filter-checkbox">
      <div className="filter-checkbox__vertical-element"></div>
      <input className="filter-checkbox__input"
        type="checkbox"
        name="shortFilm"
        defaultChecked={isChecked}
      ></input>
      <div className="filter-checkbox__text">Короткометражки</div>
    </label>
  );
}

