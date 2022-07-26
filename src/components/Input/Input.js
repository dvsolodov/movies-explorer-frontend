import './Input.css';

export default function Input ({ validation, validator, inputTitle, inputName, inputError, inputType }) {
  return (
    <label className="input">
      <p className="input__title">{inputTitle}</p>
      <input className="input__field"
        {...validation}
        type={inputType}
        name={inputName}
        onChange={validator}
      />
      <p className="input__error">{inputError}</p>
    </label>
  );
}
