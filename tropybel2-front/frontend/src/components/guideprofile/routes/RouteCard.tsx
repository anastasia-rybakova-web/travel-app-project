import React from "react";
import { Route } from "../../../types/user.types";
import "./RouteCard.css";

interface RouteCardProps {
  route: Route;
  onEdit: (route: Route) => void;
}

export default function RouteCard({ route, onEdit }: RouteCardProps): React.JSX.Element {
  const rating = route.rating || 0;

  return (
    <div className="profile-route-card">
      <div className="profile-route-image-wrapper">
        <div
          className="profile-route-image"
          style={{ backgroundImage: `url(${route.photos?.[0]})` }}
        ></div>
        <div className="profile-route-price-tag">{route.price} руб/чел</div>
        {route.type && <div className="profile-route-type-tag">{route.type}</div>}
      </div>

      <div className="profile-route-info">
        <h3>{route.title}</h3>
        <p className="profile-route-desc">{route.shortDescription}</p>

        <div className="profile-route-details">
          <p>Длительность: {route.duration}</p>
          <p>Группа: {route.people} человек</p>
        </div>

        <div className="profile-route-bottom">
          <button className="profile-route-details-btn" onClick={() => onEdit(route)}>
            Редактировать
          </button>
          <p className="profile-route-rating"> {rating}</p>
        </div>
      </div>
    </div>
  );
}