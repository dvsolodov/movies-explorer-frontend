import { Link } from 'react-router-dom';

function Main() {
  return (
    <main className="content">
      <h1>О проекте</h1>
      <nav>
        <Link to="/">О проекте</Link>
        <Link to="/movies">Фильмы</Link>
        <Link to="/saved-movies">Сохраненные фильмы</Link>
        <Link to="/profile">Профиль</Link>
        <Link to="/signin">Вход</Link>
        <Link to="/signup">Регистрация</Link>
      </nav>
    </main>
  );
}

export default Main;
