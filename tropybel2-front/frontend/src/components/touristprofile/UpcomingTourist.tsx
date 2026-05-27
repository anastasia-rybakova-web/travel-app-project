import React, { useState, useEffect } from "react";
import { apiService } from "../../services/api.service";
import { User, Booking, Route } from "../../types/user.types";
import "./UpcomingTourist.css";

interface UpcomingTouristProps {
  user: User;
}

export default function UpcomingTourist({ user }: UpcomingTouristProps): React.JSX.Element {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUpcoming = async () => {
      try {
        const allBookings = await apiService.getBookingsByTourist(user.id);
        const upcomingBookings = allBookings.filter(b => b.status === "confirmed");
        setBookings(upcomingBookings);
        
        const uniqueRouteIds = [...new Set(upcomingBookings.map(b => b.routeId))];
        const routesData = await Promise.all(
          uniqueRouteIds.map(id => apiService.getRouteById(id))
        );
        setRoutes(routesData);
      } catch (error) {
        console.error("Ошибка загрузки предстоящих туров:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUpcoming();
  }, [user.id]);

  const getRoute = (id: number): Route | undefined => routes.find(r => r.id === id);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="upcoming-tourist">
      <h2>Предстоящие туры</h2>

      {bookings.length === 0 ? (
        <p className="no-upcoming">У вас нет предстоящих туров</p>
      ) : (
        bookings.map(b => {
          const route = getRoute(b.routeId);
          if (!route) return null;

          return (
            <div key={b.id} className="upcoming-booking-card">
              <h3>{route.title}</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <b>Дата проведения:</b>
                  <span>{b.date}</span>
                </div>
                <div className="detail-item">
                  <b>Количество человек:</b>
                  <span>{b.people}</span>
                </div>
                <div className="detail-item">
                  <b>Длительность:</b>
                  <span>{route.duration || "Не указано"}</span>
                </div>
                <div className="detail-item">
                  <b>Общая стоимость:</b>
                  <span>{Number(route.price) * b.people} руб</span>
                </div>
              </div>
              <p>
                <b>Статус:</b>
                <span className="status-badge">Подтвержден</span>
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}