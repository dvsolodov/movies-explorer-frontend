import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className="about-project" id="about">
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__features">
        <li className="about-project__feature">
          <h3  className="about-project__feature-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__feature-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__feature">
          <h3  className="about-project__feature-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__feature-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about-project__timeline">
        <div className="about-project__timeline-span about-project__timeline-span_left">
          <h3 className="about-project__timeline-span-title about-project__timeline-span-title_bg_green">
            1 неделя
          </h3>
          <p className="about-project__timeline-span-value">
            Back-end
          </p>
        </div>
        <div className="about-project__timeline-span">
          <h3 className="about-project__timeline-span-title">
            4 недели
          </h3>
          <p className="about-project__timeline-span-value">
            Front-end
          </p>
        </div>
      </div>
    </section>
  );
}

