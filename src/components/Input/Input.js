import './Input.css';

export default function Input ({ inputTitle, inputName, inputValue, inputError, inputType }) {
  return (
    <label className="input">
      <p className="input__title">{inputTitle}</p>
      <input className="input__field"
        type={inputType}
        name={inputName}
        value={inputValue}
      />
      <p className="input__error">{inputError}</p>
    </label>
  );
}
