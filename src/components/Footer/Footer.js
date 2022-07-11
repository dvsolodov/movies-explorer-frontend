import './Footer.css';

export default function Footer() {
  const ya_praktikum = "https://practicum.yandex.ru/web/";
  const my_github = "https://github.com/dvsolodov";
  const my_telegram = "https://t.me/majordvs";

  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__wrap">
        <p className="footer__copy">&copy; 2022</p>
        <ul className="footer__links">
          <li className="footer__links-item">
            <a className="footer__link"
              href={ya_praktikum}
              target="_blank"
              rel="noopener noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__links-item">
            <a className="footer__link"
              href={my_github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer__links-item">
            <a className="footer__link"
              href={my_telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
