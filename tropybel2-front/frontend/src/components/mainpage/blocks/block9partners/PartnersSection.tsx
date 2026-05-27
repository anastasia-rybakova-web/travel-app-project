import React from "react";
import "./PartnersSection.css";

interface Partner {
  id: number;
  img: string;
  name: string;
}

const partners: Partner[] = [
  { id: 1, img: "/images/mainpage/partners/coral.jpg", name: "Партнёр 1" },
  { id: 2, img: "/images/mainpage/partners/dadatur.jpg", name: "Партнёр 2" },
  { id: 3, img: "/images/mainpage/partners/dima.jpg", name: "Партнёр 3" },
  { id: 4, img: "/images/mainpage/partners/funsun.jpg", name: "Партнёр 4" },
  { id: 5, img: "/images/mainpage/partners/globus.jpg", name: "Партнёр 5" },
  { id: 6, img: "/images/mainpage/partners/inter.jpg", name: "Партнёр 6" },
  { id: 7, img: "/images/mainpage/partners/itl.jpg", name: "Партнёр 7" },
  { id: 8, img: "/images/mainpage/partners/koleso.jpg", name: "Партнёр 8" },
  { id: 9, img: "/images/mainpage/partners/milya.jpg", name: "Партнёр 9" },
  { id: 10, img: "/images/mainpage/partners/mister.jpg", name: "Партнёр 10" },
  { id: 11, img: "/images/mainpage/partners/pegas.jpg", name: "Партнёр 11" },
  { id: 12, img: "/images/mainpage/partners/travellab.jpg", name: "Партнёр 12" },
];

export default function PartnersSection(): React.JSX.Element {
  return (
    <section className="partners-section">
      <div className="partners-container">
        <div className="partners-header">
          <h2>Наши партнёры</h2>
          <div className="partners-divider">
            <span className="partners-line">―――</span>
            <span className="partners-dots">•••</span>
            <span className="partners-line">―――</span>
          </div>
          <p>
            Мы сотрудничаем с ведущими компаниями, которые помогают нам
            развивать технологии, повышать качество и достигать новых высот.
          </p>
        </div>

        <div className="partners-grid">
          {partners.map((partner) => (
            <div key={partner.id} className="partner-card text-center">
              <div className="partner-image">
                <a href="#">
                  <img src={partner.img} alt={partner.name} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}