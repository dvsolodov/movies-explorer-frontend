import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Input from '../Input/Input';
import AuthFormButton from '../AuthFormButton/AuthFormButton';

export default function Register() {
  return (
    <section className="register">
      <Logo />
      <h1 className="register__hello">Добро пожаловать!</h1>
      <form className="register__form">
        <Input
           inputType="text"
           inputTitle="Имя"
           inputValue="Денис"
           inputName="name"
           inputError=""
          />
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
        <AuthFormButton buttonTitle="Зарегистрироваться"/>
      </form>
      <p className="register__is-account">
        Уже зарегистрированы? <Link className="register__is-account register__is-account_text-enter" to="/signin">Войти</Link>
      </p>
    </section>
  );
}
