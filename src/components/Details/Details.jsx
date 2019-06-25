import React from 'react';

const Details = () => (
  <div className="overlay">
    <article className="details">
      <button className="details-close" type="button">Закрыть</button>

      <h2 className="details-title">Квартира на Невском</h2>

      <section className="details-main">
        <p className="details-date">три дня назад</p>
        <p className="details-price">8&thinsp;000&thinsp;000&nbsp;₽</p>

        <section className="details-gallery">
          <img src="" alt="" className="details-gallery-preview" />
          <div className="details-gallery-thumbnails">
            <img src="" alt="" className="details-gallery-item" />
            <img src="" alt="" className="details-gallery-item" />
            <img src="" alt="" className="details-gallery-item" />
            <img src="" alt="" className="details-gallery-item" />
          </div>
        </section>

        <p className="details-description">
          Просторная трехкомнатная квартира. Окна на восток. 15 минут пешком до метро.
          В собственности более трех лет. Согласованная перепланировка. Подходит под ипотеку
        </p>
      </section>

      <aside className="details-aside">
        <section className="details-address">
          <p className="details-address-text">м.&nbsp;Купчино, улица Лётчика Иванова, 3</p>
          <div className="details-address-map" />
        </section>

        <section className="details-seller">
          <a href="#1" className="details-seller-link">
            <h3 className="details-seller-name">Агентство недвижимости «Купчино»</h3>
          </a>

          <p className="details-seller-rating details-seller-rating-good">
            рейтинг
            <span className="details-seller-rating-val">4.3</span>
            <a href="#1">Отзывы</a>
          </p>
        </section>
      </aside>
    </article>
  </div>
);

export default Details;
