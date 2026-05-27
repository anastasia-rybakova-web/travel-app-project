import React from "react";
import { useNavigate } from "react-router-dom";
import { teamMembers } from "./teamData.ts";
import "./aboutteam.css";

export default function AboutTeam(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <section className="about-team">
      <div className="about-team__container">
        <div className="about-team__header">
          <h2>Мы готовы</h2>
          <h1>Наша команда</h1>
          <div className="about-team__divider"></div>
          <p>Профессиональные гиды помогут вам открыть Беларусь с новой стороны</p>
        </div>

        <div className="about-team__cards">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div
                className="team-card__image"
                style={{ backgroundImage: `url(${member.image})` }}
              ></div>
              <div className="team-card__info">
                <h3>{member.name}</h3>
                <p>{member.category}</p>
                <button className="team-card__btn" onClick={() => navigate("/guides")}>Подробнее</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}