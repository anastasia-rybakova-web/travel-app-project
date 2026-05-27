import React from "react";
import Accordion from "./Accordion";
import "./aboutsection.css";

export default function AboutSection(): React.JSX.Element {
  return (
    <section className="home-about-section">
      <div className="home-about-overlay">
        <div className="home-about-title">
          <h2>Любители путешествий</h2>
          <h1>КТО МЫ</h1>
          <div className="home-about-divider"></div>
          <p>Мы создаём сервис для тех, кто ищет новые впечатления и эмоции.</p>
        </div>

        <div className="home-about-content">
          <div className="home-about-left">
            <h2>Наша история</h2>
            <p>
              Мы начинали как команда энтузиастов, любящих исследовать Беларусь.
            </p>
            <p>
              Мы верим, что каждый маршрут может быть уникальным и вдохновляющим.
            </p>
          </div>

          <div className="home-about-right">
            <h2>Почему выбирают нас?</h2>
            <Accordion />
          </div>
        </div>
      </div>
    </section>
  );
}