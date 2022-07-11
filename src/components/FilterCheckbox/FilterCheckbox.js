import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <label className="filter-checkbox">
      <input className="filter-checkbox__input" type="checkbox"></input>
      <div className="filter-checkbox__text">Короткометражки</div>
    </label>
  );
}

