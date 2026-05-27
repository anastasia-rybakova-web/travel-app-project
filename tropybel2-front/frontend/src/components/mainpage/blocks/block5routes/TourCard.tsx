import React from "react";
import { useNavigate } from "react-router-dom";
import { Tour } from "./toursData";
import "./tourcard.css";

interface TourCardProps {
  tour: Tour;
  onDaysChange: (id: number, value: string) => void;
}

export default function TourCard({ tour, onDaysChange }: TourCardProps): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="tour-card-item">
      <div className="tour-card-image-wrapper">
        <div
          className="tour-card-image"
          style={{ backgroundImage: `url(${tour.image})` }}
        ></div>
        <div className="tour-card-price-tag">{tour.price}p./чел</div>
      </div>

      <div className="tour-card-info">
        <input
          className="tour-card-days-input"
          type="text"
          value={tour.days}
          onChange={(e) => onDaysChange(tour.id, e.target.value)}
        />

        <h3>{tour.title}</h3>
        <p className="tour-card-desc">{tour.description}</p>

        <div className="tour-card-details">
          <p>Тип: {tour.type}</p>
          <p>Группа до {tour.people} человек</p>
        </div>

        <div className="tour-card-bottom">
          <button
            className="tour-card-details-btn"
            onClick={() => navigate("/routes")}
          >
            Подробнее
          </button>

          <p className="tour-card-rating"> {tour.rating}</p>
        </div>
      </div>
    </div>
  );
}