import React from "react";
import { useNavigate } from "react-router-dom";
import "./servicessection.css";

export default function ServicesSection(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <section className="home-services-section">
      <div className="home-services-container">
        <div className="home-services-content">
          <div className="home-services-text-column">
            <h2>Время начать свое путешествие</h2>
            <p>
              Откройте для себя Беларусь с новой стороны — удивительные маршруты,
              уникальные достопримечательности и скрытые уголки ждут вас.
            </p>
            <p>
              Отправьтесь в путешествие, которое оставит яркие впечатления и
              незабываемые эмоции.
            </p>
            <p>
              <a
                href="#"
                className="home-services-btn-chose-rout"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  navigate("/routes");
                }}
              >
                Выбрать маршрут
              </a>
            </p>
          </div>

          <div className="home-services-blocks-column">
            <div className="home-services-block">
              <h3>Экскурсионные туры</h3>
              <p>
                Откройте для себя культурные и исторические достопримечательности Беларуси.
              </p>
              <a
                href="#"
                className="home-services-btn-outline"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  navigate("/routes");
                }}
              >
                Подробнее
              </a>
            </div>

            <div className="home-services-block">
              <h3>Персональные гиды</h3>
              <p>
                Индивидуальные гиды помогут составить маршрут под ваши интересы.
              </p>
              <a
                href="#"
                className="home-services-btn-outline"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  navigate("/guides");
                }}
              >
                Подробнее
              </a>
            </div>

            <div className="home-services-block">
              <h3>Интересные локации</h3>
              <p>
                Посетите самые красивые и необычные места Беларуси.
              </p>
              <a
                href="#"
                className="home-services-btn-outline"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  navigate("/places");
                }}
              >
                Подробнее
              </a>
            </div>

            <div className="home-services-block">
              <h3>Активные туры</h3>
              <p>
                Для любителей активного отдыха — походы, велотуры, водные приключения.
              </p>
              <a
                href="#"
                className="home-services-btn-outline"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  navigate("/routes");
                }}
              >
                Подробнее
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}