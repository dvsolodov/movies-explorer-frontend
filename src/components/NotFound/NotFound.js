import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <section className="not-found">
      <div className="not-found__wrap">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__under-title">
          Страница не найдена
        </p>
        <button className="not-found__btn" onClick={goBack}>
          Назад
        </button>
      </div>
    </section>
  );
}

export default NotFound;
