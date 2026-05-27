import React from "react";
import { useNavigate } from "react-router-dom";
import { Place } from "../../../types/user.types";
import "./PlaceCard.css";

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps): React.JSX.Element {
  const navigate = useNavigate();
  const rating = place.rating || 0;
  const mainTag = place.tags?.[0];

  const handleDetails = (): void => {
    navigate(`/places/${place.id}`);
  };

  return (
    <div className="place-card-item">
      <div className="place-card-image-wrapper">
        <div
          className="place-card-image"
          style={{ backgroundImage: `url(${place.photos?.[0] || ''})` }}
        >
          <h3 className="place-card-title">{place.title}</h3>
          {mainTag && <span className="place-card-main-tag">{mainTag}</span>}
        </div>
      </div>

      <div className="place-card-content">
        <p className="place-card-address">Местоположение: {place.address}</p>
        <p className="place-card-description">{place.shortDescription}</p>
        <p className="place-card-details">Теги: {place.tags?.join(", ") || ''}</p>

        <div className="place-card-footer">
          <button className="place-card-button" onClick={handleDetails}>
            Подробнее
          </button>
          <p className="place-card-rating"> {rating}</p>
        </div>
      </div>
    </div>
  );
}