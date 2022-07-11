import './Portfolio.css';
import portfolio__arrow from '../../images/portfolio__arrow.svg';

export default function Portfolio() {
  const staticSiteUrl = "https://github.com/dvsolodov/how-to-learn";
  const adaptiveSiteUrl = "https://github.com/dvsolodov/russian-travel";
  const spaUrl = "https://github.com/dvsolodov/react-mesto-api-full";

  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__projects">
        <li className="portfolio__project">
          <a className="portfolio__project-link"
            href={staticSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Статичный сайт
            <img className="portfolio__arrow"
              src={portfolio__arrow}
              alt="Стрелка"
            >
            </img>
          </a>
        </li>
        <li className="portfolio__project">
          <a className="portfolio__project-link"
            href={adaptiveSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Адаптивный сайт
            <img className="portfolio__arrow"
              src={portfolio__arrow}
              alt="Стрелка"
            >
            </img>
          </a>
        </li>
        <li className="portfolio__project">
          <a className="portfolio__project-link"
            href={spaUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Одностраничное приложение
            <img className="portfolio__arrow"
              src={portfolio__arrow}
              alt="Стрелка"
            >
            </img>
          </a>
        </li>
      </ul>
    </section>
  );
}

