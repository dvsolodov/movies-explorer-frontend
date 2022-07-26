import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Input from '../Input/Input';
import AuthFormButton from '../AuthFormButton/AuthFormButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';

export default function Register() {
  const navigate = useNavigate();
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [totalError, setTotalError] = useState("");

  useEffect(() => {
    setTotalError("");

    if (isValidName && isValidEmail && isValidPassword) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isValidName, isValidEmail, isValidPassword]);

  function handleSubmit(e) {
    e.preventDefault();

    const form = document.forms.register;
    const elements = form.elements;
    const nameEl = elements.name;
    const emailEl = elements.email;
    const passwordEl = elements.password;

    if (nameEl.validity.valid && emailEl.validity.valid && passwordEl.validity.valid) {
      register({
        name:nameEl.value,
        email:emailEl.value,
        password:passwordEl.value
      });
      setIsValid(true);
      setTotalError("");
    } else {
      setIsValid(false);
      setTotalError("Заполните все поля формы");
      console.log('Заполните все поля формы');
    }
  }

  function register(formData) {
    mainApi.register(formData)
    .then((data) => {
      if (data.message !== undefined) {
        setTotalError(data.message);
      } else {
        localStorage.setItem('token', data.token);
        navigate("../movies", { replace: true });
      }
    })
    .catch((err) => console.log(err));
  }

  return (
    <section className="register">
      <div className="register__wrap">
        <Logo />
        <h1 className="register__hello">Добро пожаловать!</h1>
        <form className="register__form" name="register" onSubmit={handleSubmit} noValidate>
          <Input
            validationRules={{
              pattern:"[a-zA-Zа-яА-ЯёЁ_-]{2,30}",
              required:true,
            }}
            customErrorMsg="2-30 символов латиницы, кириллицы, пробел или дефис"
            setIsValid={setIsValidName}
            inputType="text"
            inputTitle="Имя"
            inputName="name"
            />
          <Input
            validationRules={{
              required:true,
            }}
            customErrorMsg=""
            setIsValid={setIsValidEmail}
            inputType="email"
            inputTitle="E-mail"
            inputName="email"
          />
          <Input
            validationRules={{
              required:true,
            }}
            customErrorMsg=""
            setIsValid={setIsValidPassword}
            inputType="password"
            inputTitle="Пароль"
            inputName="password"
          />
          <p className="register__total-error">{totalError}</p>
          <AuthFormButton buttonTitle="Зарегистрироваться" isDisabled={!isValid} />
        </form>
        <p className="register__is-account">
          Уже зарегистрированы? <Link className="register__is-account register__is-account_text-enter" to="/signin">Войти</Link>
        </p>
      </div>
    </section>
  );
}
