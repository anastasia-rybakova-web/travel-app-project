import React from "react";
import { useNavigate } from "react-router-dom";
import { Place } from "../../../types/user.types";
import "./PlaceCard.css";

interface PlaceCardProps {
  place: Place;
  onEdit: (place: Place) => void;
}

export default function PlaceCard({ place, onEdit }: PlaceCardProps): React.JSX.Element {
  const navigate = useNavigate();
  const rating = place.rating || 0;

  const handleDetails = (): void => {
    navigate(`/places/${place.id}`);
  };

  return (
    <div className="package-card">
      <div className="image-wrapper">
        <div
          className="package-image"
          style={{ backgroundImage: `url(${place.photos?.[0] || ''})` }}
        ></div>
        {place.tags?.length > 0 && (
          <div className="price-tag">{place.tags[0]}</div>
        )}
      </div>

      <div className="package-info">
        <h3>{place.title}</h3>
        <p className="place-address">{place.address}</p>
        <p className="desc">{place.shortDescription}</p>

        <div className="details">
          <p>Теги: {Array.isArray(place.tags) ? place.tags.join(', ') : ''}</p>
        </div>

        <div className="bottom">
          <button className="details-btn" onClick={handleDetails}>
            Подробнее
          </button>
          <button className="details-btn" onClick={() => onEdit(place)}>
            Редактировать
          </button>
          <p className="rating"> {rating}</p>
        </div>
      </div>
    </div>
  );
}