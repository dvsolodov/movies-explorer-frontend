import { useState } from 'react';
import './Input.css';

export default function Input ({ validationRules, setIsValid, inputTitle, inputName, inputType }) {
  const [inputError, setInputError] = useState("");

  function handleChange(e) {
    const error = e.target.validationMessage;
    setInputError(error);

    if (error === "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  return (
    <label className="input">
      <p className="input__title">{inputTitle}</p>
      <input className="input__field"
        {...validationRules}
        type={inputType}
        name={inputName}
        onChange={handleChange}
      />
      <p className="input__error">{inputError}</p>
    </label>
  );
}
