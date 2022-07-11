import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../images/about-me__img.jpg';

export default function AboutMe() {
  const my_telegram = "https://t.me/majordvs";
  const my_github = "https://github.com/dvsolodov";

  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <article className="about-me__article">
        <div className="about-me__article-wrap">
          <h3 className="about-me__name">Денис</h3>
          <p className="about-me__info">
            Фронтенд-разработчик, 43 лет
          </p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className="about-me__links">
            <li className="about-me__item">
              <a className="about-me__link"
                href={my_telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
            </li>
            <li className="about-me__item">
              <a className="about-me__link"
                href={my_github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img className="about-me__img"
          src={photo}
          alt="Это я"
        ></img>
      </article>
      <Portfolio />
    </section>
  );
}
