import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiService } from "../../services/api.service";
import { Route, Place, User } from "../../types/user.types";
import Footer from "../../components/mainpage/Footer";
import RouteReviews from "../../components/routespage/route/RouteReviews"; 
import PlaceCard from "../../components/placespage/place/PlaceCard";
import RouteBookingModal from "../../components/routespage/route/RouteBookingModal";
import "./RoutePage.css";

export default function RoutePage(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [route, setRoute] = useState<Route | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [showBooking, setShowBooking] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  useEffect(() => {
  const fetchRoute = async () => {
    if (!id) return;
    try {
      const data = await apiService.getRouteWithAllData(parseInt(id));
      console.log("Данные маршрута (withAllData):", data);
      console.log("dates:", data.dates);
      setRoute(data);
      if (data.places && data.places.length) {
        setPlaces(data.places);
      }
    } catch (error) {
      console.error("Ошибка загрузки маршрута:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchRoute();
}, [id]);

  if (loading) return <p className="route-page-loading">Загрузка...</p>;
  if (!route) return <p className="route-page-loading">Маршрут не найден</p>;

  const galleryPhotos = [
    ...(route.photos || []),
    ...places.flatMap(p => p.photos || [])
  ];
  const mainPhoto = route.photos?.[0] || places[0]?.photos?.[0] || null;

  return (
    <section className="route-page-section">
      {mainPhoto && (
        <div className="route-main-image">
          <img src={mainPhoto} alt={route.title} />
        </div>
      )}

      <div className="route-page-header">
        <Link to="/routes" className="back-link">Все маршруты</Link>
        <h1>{route.title}</h1>
        <div className="route-page-divider">
          <span className="route-page-line">―――</span>
          <span className="route-page-dots">•••</span>
          <span className="route-page-line">―――</span>
        </div>
      </div>

      <div className="route-page-content">
        <div className="route-info-item route-info-duration">
          <h3 className="route-info-title">Длительность:</h3>
          <p className="route-info-text">{route.duration}</p>
        </div>

        <div className="route-info-item route-info-group">
          <h3 className="route-info-title">Группа:</h3>
          <p className="route-info-text">до {route.people} человек</p>
        </div>

        <div className="route-info-item route-info-price">
          <h3 className="route-info-title">Цена:</h3>
          <p className="route-info-text">{route.price} руб/чел</p>
        </div>

        <div className="route-description">
          <h3 className="route-description-title">Описание:</h3>
          <p className="route-description-text">{route.description}</p>
        </div>

        {route.routeDates && route.routeDates.length > 0 && (
          <div className="route-dates">
            <h3 className="route-dates-title">Доступные даты:</h3>
            <div className="route-dates-text">
              {route.routeDates.map((rd, idx) => (
                <span key={idx}>{new Date(rd.date).toISOString().split('T')[0]}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <h2 className="route-places-title">Места в маршруте</h2>
      <div className="route-places-grid">
        {places.map(p => (
          <PlaceCard key={p.id} place={p} />
        ))}
      </div>

      {galleryPhotos.length > 0 && (
        <div className="route-gallery">
          <h2 className="route-gallery-title">Фотогалерея маршрута</h2>
          <div className="route-gallery-grid">
            {galleryPhotos.map((photo, idx) => (
              <div key={idx} className="route-gallery-item">
                <img src={photo} alt={`${route.title} ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        className="route-booking-btn"
        onClick={() => {
          if (!user) {
            window.location.href = "/login";
            return;
          }
          setShowBooking(true);
        }}
      >
        Забронировать
      </button>
      
      {showBooking && route && (
        <RouteBookingModal
          route={route}
          user={user}
          onClose={() => setShowBooking(false)}
        />
      )}

      <RouteReviews routeId={route.id} />
      <Footer />
    </section>
  );
}