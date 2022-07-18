import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Input from '../Input/Input';
import AuthFormButton from '../AuthFormButton/AuthFormButton';

export default function Login() {
  return (
    <section className="login">
      <div className="login__wrap">
        <Logo />
        <h1 className="login__hello">Рады видеть!</h1>
        <form className="login__form">
          <Input
            inputType="email"
            inputTitle="E-mail"
            inputValue="example@yandex.ru"
            inputName="email"
            inputError=""
          />
          <Input
            inputType="password"
            inputTitle="Пароль"
            inputValue="09u09u0"
            inputName="password"
            inputError="Что-то пошло не так..."
          />
          <AuthFormButton buttonTitle="Войти"/>
        </form>
        <p className="login__is-not-account">
          Ещё не зарегистрированы? <Link className="login__is-not-account login__is-not-account_text-enter" to="/signup">Регистрация</Link>
        </p>
      </div>
    </section>
  );
}
