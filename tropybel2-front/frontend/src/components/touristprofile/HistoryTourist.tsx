import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../services/api.service";
import { User, Booking, Route, GuideProfile } from "../../types/user.types";
import StarRating from "./StarRating";
import "./HistoryTourist.css";

interface HistoryTouristProps {
  user: User;
}

export default function HistoryTourist({ user }: HistoryTouristProps): React.JSX.Element {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedReviewType, setSelectedReviewType] = useState<string | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);
  const [selectedGuideId, setSelectedGuideId] = useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const allBookings = await apiService.getBookingsByTourist(user.id);
        const pastBookings = allBookings.filter(b => b.status === "done");
        setBookings(pastBookings);
        
        const uniqueRouteIds = [...new Set(pastBookings.map(b => b.routeId))];
        const routesData = await Promise.all(
          uniqueRouteIds.map(id => apiService.getRouteById(id))
        );
        setRoutes(routesData);
      } catch (error) {
        console.error("Ошибка загрузки истории:", error);
      }
    };
    loadHistory();
  }, [user.id]);

  const getRoute = (id: number): Route | undefined => routes.find(r => r.id === id);

  const handleReviewClick = (routeId: number, guideUserId: number): void => {
    setSelectedRouteId(routeId);
    setSelectedGuideId(guideUserId);
    setSelectedReviewType(null);
    setSuccessMessage("");
    setShowReviewForm(false);
  };

  const handleReviewTypeSelect = (type: string): void => {
    setSelectedReviewType(type);
    setShowReviewForm(true);
    setSuccessMessage("");
  };

  const handleReviewSubmit = async (e: React.FormEvent): Promise<void> => {
  e.preventDefault();
  if (isSubmitting) return;
  
  setIsSubmitting(true);

  try {
    const profile = await apiService.getTouristProfile(user.id);

    if (selectedReviewType === 'route' && selectedRouteId) {
      await apiService.addRouteReview(selectedRouteId, {
        rating,
        text,
        username: profile.name,
        photo: profile.photo, 
      });
    } else if (selectedReviewType === 'guide' && selectedGuideId) {
      await apiService.addGuideReview(selectedGuideId, {
        rating,
        text,
        username: profile.name,
        photo: profile.photo, 
      });
    }

    setSuccessMessage(`Отзыв успешно добавлен!`);
    setShowReviewForm(false);
    setSelectedReviewType(null);
    setSelectedRouteId(null);
    setSelectedGuideId(null);
    setRating(5);
    setText("");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
    
  } catch (error) {
    console.error("Ошибка при сохранении отзыва:", error);
    setSuccessMessage("Произошла ошибка при сохранении отзыва");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleCancel = (): void => {
    if (isSubmitting) return;
    setSelectedRouteId(null);
    setSelectedGuideId(null);
    setSelectedReviewType(null);
    setShowReviewForm(false);
    setRating(5);
    setText("");
    setSuccessMessage("");
  };

  const handleViewRoute = (routeId: number): void => {
    navigate(`/routes/${routeId}`);
  };

  return (
    <div className="history-tourist">
      <h2>История поездок</h2>

      {successMessage && (
        <div className="history-success-message">
          {successMessage}
        </div>
      )}

      {selectedRouteId && !showReviewForm && !selectedReviewType && (
        <div className="review-type-selector">
          <h3>Выберите, кому оставить отзыв</h3>
          <div className="review-type-buttons">
            <button 
              className="review-type-btn route-btn"
              onClick={() => handleReviewTypeSelect('route')}
              disabled={isSubmitting}
            >
              Оставить отзыв о маршруте
            </button>
            <button 
              className="review-type-btn guide-btn"
              onClick={() => handleReviewTypeSelect('guide')}
              disabled={isSubmitting}
            >
              Оставить отзыв о гиде
            </button>
            <button 
              className="review-type-btn cancel-btn"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {showReviewForm && selectedRouteId && selectedReviewType && (
        <div className="review-form-container">
          <div className="review-form-content">
            <div className="form-header">
              <h3>Оставить отзыв {selectedReviewType === 'route' ? 'о маршруте' : 'о гиде'}</h3>
              <button 
                className="close-form-btn"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label>Оценка:</label>
                <StarRating 
                  value={rating} 
                  onChange={setRating} 
                  allowHalf 
                  readonly={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label>Отзыв:</label>
                <textarea
                  required
                  value={text}
                  onChange={e => setText(e.target.value)}
                  className="review-textarea"
                  placeholder="Поделитесь своими впечатлениями..."
                  rows={5}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-buttons">
                <button 
                  type="submit" 
                  className="submit-review-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Отправить отзыв"}
                </button>
                <button 
                  type="button" 
                  className="cancel-review-btn"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {bookings.length === 0 ? (
        <p className="no-history">У вас еще нет завершенных поездок</p>
      ) : (
        bookings.map(b => {
          const route = getRoute(b.routeId);
          if (!route) return null;

          return (
            <div key={b.id} className="history-booking-card">
              <div className="history-booking-header">
                <h3>{route.title}</h3>
                <span className="history-date">{b.date}</span>
              </div>
              
              <div className="history-booking-details">
                <p><b>Количество человек:</b> {b.people}</p>
                <p><b>Общая стоимость:</b> {Number(route.price) * b.people} руб</p>
                <p>
                  <b>Статус:</b>
                  <span className="status-badge">Завершено</span>
                </p>
              </div>

              <div className="history-booking-actions">
                <button 
                  className="history-review-btn"
                  onClick={() => handleReviewClick(route.id, route.guideUserId)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Обработка..." : "Оставить отзыв"}
                </button>
                <button 
                  className="history-view-route-btn"
                  onClick={() => handleViewRoute(route.id)}
                  disabled={isSubmitting}
                >
                  Посмотреть маршрут
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}