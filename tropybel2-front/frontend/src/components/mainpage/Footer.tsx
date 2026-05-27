import React from "react";
import "./Footer.css";

export default function Footer(): React.JSX.Element {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Форма отправлена");
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        
        <div className="footer__block footer__about">
          <h3 className="footer__title">TropyBel</h3>
          <p className="footer__text">
            Работаем с 2025 года. Наши клиенты вернулись довольными из самых
            потрясающих точек Беларуси. Мы готовы помочь вам с поездкой на
            100% вне зависимости от сложности маршрута и его цены.
          </p>
        </div>

        <div className="footer__block footer__gallery">
          <h3 className="footer__title">Галерея</h3>
          <div className="footer__gallery-grid">
            <img src="/images/mainpage/gallery/photo1.jpg" alt="Галерея 1" />
            <img src="/images/mainpage/gallery/photo2.jpg" alt="Галерея 2" />
            <img src="/images/mainpage/gallery/photo3.jpg" alt="Галерея 3" />
            <img src="/images/mainpage/gallery/photo4.jpg" alt="Галерея 4" />
          </div>
        </div>

        <div className="footer__block footer__contacts">
          <h3 className="footer__title">Связаться с нами</h3>
          <ul className="footer__contact-list">
            <li>
              <img src="/images/mainpage/geo.png" alt="Адрес" className="footer__icon" />
              Минск, пр-т. Независимости, 42
            </li>
            <li>
              <img src="/images/mainpage/phone.png" alt="Телефон" className="footer__icon" />
              +375 (29) 123-45-67
            </li>
            <li>
              <img src="/images/mainpage/mail.png" alt="Почта" className="footer__icon" />
              info@tropybel.ru
            </li>
          </ul>
        </div>

        <div className="footer__block email__form">
          <h3 className="footer__title">Напишите нам</h3>
          <form className="footer__email-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Введите ваш e-mail"
              className="footer__input"
              required
            />
            <textarea
              placeholder="Введите ваше сообщение"
              className="footer__textarea"
              required
            ></textarea>
            <button type="submit" className="footer__button">
              Отправить
            </button>
          </form>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} TropyBel. Все права защищены.</p>
      </div>
    </footer>
  );
}