import React, { useState } from "react";
import TourCard from "./TourCard";
import { toursData } from "./toursData";
import "./PopularRutes.css";

export default function PopularRutes(): React.JSX.Element {
  const [tours, setTours] = useState(toursData);

  const handleDaysChange = (id: number, value: string): void => {
    setTours((prev) =>
      prev.map((tour) => (tour.id === id ? { ...tour, days: value } : tour))
    );
  };

  return (
    <section className="tours-routes-container">
      <div className="tours-routes-content">
        <div className="tours-routes-header">
          <h2>
            Популярные маршруты по Беларуси
            <span className="tours-routes-divider">
              <span className="tours-routes-line">――――</span>
              <span className="tours-routes-dots">•••</span>
              <span className="tours-routes-line">――――</span>
            </span>
          </h2>
          <p>
            Путешествуйте по самым красивым и историческим местам страны — от древних замков до заповедных лесов.
          </p>
        </div>

        <div className="tours-routes-grid">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onDaysChange={handleDaysChange} />
          ))}
        </div>
      </div>
    </section>
  );
}