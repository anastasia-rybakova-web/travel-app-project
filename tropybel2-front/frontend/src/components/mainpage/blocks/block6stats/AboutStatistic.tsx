import React from "react";
import "./aboutstatistic.css";

interface Stat {
  number: number;
  label: string;
}

const statsData: Stat[] = [
  { number: 100, label: "Успешных туров" },
  { number: 24000, label: "Счастливых туристов" },
  { number: 200, label: "Посещённых мест" },
];

export default function AboutStatistic(): React.JSX.Element {
  return (
    <section className="about-statistic">
      <div className="about-statistic__container">
        <div className="about-statistic__row">
          
          <div className="about-statistic__image"></div>

          <div className="about-statistic__content">
            <div className="about-statistic__heading">
              <h2>Сделайте своё путешествие по Беларуси незабываемым и безопасным</h2>
              <p>
                Откройте для себя Беларусь с новой стороны: живописные города, исторические замки,
                национальные парки и скрытые уголки ждут вас. Путешествуйте с комфортом и
                получайте яркие впечатления вместе с нами.
              </p>
            </div>

            <div className="about-statistic__stats">
              {statsData.map((stat, index) => (
                <div key={index} className="about-statistic__stat">
                  <strong className="about-statistic__number">{stat.number}</strong>
                  <span className="about-statistic__label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}