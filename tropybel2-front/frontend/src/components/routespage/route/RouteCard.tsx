import React from "react";
import { useNavigate } from "react-router-dom";
import { Route, Place } from "../../../types/user.types";
import "./RouteCard.css";

interface RouteCardProps {
  route: Route;
  allPlaces: Place[];
}

export default function RouteCard({ route, allPlaces }: RouteCardProps): React.JSX.Element {
  const navigate = useNavigate();

  let mainPhoto: string | undefined = route.photos?.[0];

  if (!mainPhoto && route.routePlaces?.length && allPlaces?.length) {
    const firstPlaceId = route.routePlaces[0]?.placeId;
    const firstPlace = allPlaces.find(p => p.id === firstPlaceId);
    mainPhoto = firstPlace?.photos?.[0];
  }

  return (
    <div className="route-card-item">
      <div className="route-card-image-wrapper">
        <div
          className="route-card-image"
          style={{ backgroundImage: `url(${mainPhoto || ""})` }}
        ></div>
        <div className="route-card-price-tag">{route.price} руб/чел</div>
      </div>

      <div className="route-card-content">
        <p className="route-card-duration">{route.duration}</p>
        <h3 className="route-card-title">{route.title}</h3>
        <p className="route-card-description">{route.shortDescription}</p>

        <div className="route-card-details">
          <p>Тип: {route.type}</p>
          <p>Группа до {route.people} человек</p>
        </div>

        <div className="route-card-footer">
          <button
            className="route-card-button"
            onClick={() => navigate(`/routes/${route.id}`)}
          >
            Подробнее
          </button>
          <p className="route-card-rating">{route.rating ?? 0}</p>
        </div>
      </div>
    </div>
  );
}