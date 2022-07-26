import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Input from '../Input/Input';
import AuthFormButton from '../AuthFormButton/AuthFormButton';
import { vldtr } from '../../utils/Validator';
import { useEffect, useState } from 'react';

export default function Register() {
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [totalErr, setTotalErr] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (nameErr !== "" || emailErr !== "" || passwordErr !== "") {
      setIsValid(false);
      setTotalErr("");
    } else {
      setIsValid(true);
    }
  }, [nameErr, emailErr, passwordErr]);

  /*
  useEffect(() => {
    setIsValid(false);
  }, []);
  */

  function nameValidator(e) {
    vldtr.validateName(e.target);
    setNameErr(vldtr.nameErr);
  }

  function emailValidator(e) {
    vldtr.validateEmail(e.target);
    setEmailErr(vldtr.emailErr);
  }

  function passwordValidator(e) {
    vldtr.validatePassword(e.target);
    setPasswordErr(vldtr.passwordErr);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formElements = document.forms.register.elements;
    const nameVal = formElements.name.value.trim();
    const emailVal = formElements.email.value.trim();
    const passwordVal = formElements.password.value.trim();

    if (nameVal !== "" && emailVal !== "" && passwordVal !== "") {
      console.log(nameVal);
      console.log(emailVal);
      console.log(passwordVal);
    } else {
      setTotalErr("Неправильно заполнены поля формы!");
      setIsValid(false);
    }

  }

  function register() {

  }

  return (
    <section className="register">
      <div className="register__wrap">
        <Logo />
        <h1 className="register__hello">Добро пожаловать!</h1>
        <form className="register__form" name="register" onSubmit={handleSubmit} noValidate>
          <Input
            validation={{
              minLength:"2",
              maxLength:"30",
              required:true,
            }}
            validator={nameValidator}
            inputType="text"
            inputTitle="Имя"
            inputName="name"
            inputError={nameErr}
            />
          <Input
            validation={{
              required:true,
            }}
            validator={emailValidator}
            inputType="email"
            inputTitle="E-mail"
            inputName="email"
            inputError={emailErr}
          />
          <Input
            validation={{
              required:true,
            }}
            validator={passwordValidator}
            inputType="password"
            inputTitle="Пароль"
            inputName="password"
            inputError={passwordErr}
          />
          <p className="register__total-error">{totalErr}</p>
          <AuthFormButton buttonTitle="Зарегистрироваться" isDisabled={!isValid} />
        </form>
        <p className="register__is-account">
          Уже зарегистрированы? <Link className="register__is-account register__is-account_text-enter" to="/signin">Войти</Link>
        </p>
      </div>
    </section>
  );
}
