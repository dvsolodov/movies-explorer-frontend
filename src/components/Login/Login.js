import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Input from '../Input/Input';
import AuthFormButton from '../AuthFormButton/AuthFormButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';

export default function Login({ setLoggedIn, setCurrentUser }) {
  const navigate = useNavigate();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [totalError, setTotalError] = useState("");

  useEffect(() => {
    setTotalError("");

    if (isValidEmail && isValidPassword) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isValidEmail, isValidPassword]);

  function handleSubmit(e) {
    e.preventDefault();

    const form = document.forms.login;
    const elements = form.elements;
    const emailEl = elements.email;
    const passwordEl = elements.password;

    if (emailEl.validity.valid && passwordEl.validity.valid) {
      login ({
        email:emailEl.value,
        password:passwordEl.value
      });
      setIsValid(true);
      setTotalError("");
    } else {
      setIsValid(false);
      setTotalError("Заполните все поля формы");
    }
  }

  function login (formData) {
    mainApi.login (formData)
    .then((data) => {
      if (data.user === undefined) {
        setTotalError(data.message);
      } else {
        localStorage.setItem('_token', data.token);
        setLoggedIn(true);
        setCurrentUser(data.user);
        navigate("/movies", { replace: true });
      }
    })
    .catch((err) => console.log(err));
  }

  return (
    <section className="login">
      <div className="login__wrap">
        <Logo />
        <h1 className="login__hello">Рады видеть!</h1>
        <form className="login__form" name="login" onSubmit={handleSubmit} noValidate>
          <Input
            validationRules={{
              required:true
            }}
            setIsValid={setIsValidEmail}
            inputType="email"
            inputTitle="E-mail"
            inputName="email"
          />
          <Input
            validationRules={{
              required:true
            }}
            setIsValid={setIsValidPassword}
            inputType="password"
            inputTitle="Пароль"
            inputName="password"
          />
          <p className="login__total-error">{totalError}</p>
          <AuthFormButton buttonTitle="Войти" isDisabled={!isValid}/>
        </form>
        <p className="login__is-not-account">
          Ещё не зарегистрированы? <Link className="login__is-not-account login__is-not-account_text-enter" to="/signup">Регистрация</Link>
        </p>
      </div>
    </section>
  );
}
