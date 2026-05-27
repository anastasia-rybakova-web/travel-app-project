import React, { useState, useEffect } from "react";
import { apiService } from "../../../services/api.service";
import { User, RouteReview } from "../../../types/user.types";
import RouteReviewCard from "./RouteReviewCard";
import StarRating from "./StarRating";
import "./RouteReviews.css";

interface RouteReviewsProps {
  routeId: number;
}

export default function RouteReviews({ routeId }: RouteReviewsProps): React.JSX.Element {
  const [reviews, setReviews] = useState<RouteReview[]>([]);
  const [editingReview, setEditingReview] = useState<RouteReview | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState<string>("");
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [checkingAccess, setCheckingAccess] = useState<boolean>(true);
  const [notification, setNotification] = useState<{ message: string; type: string }>({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await apiService.getRouteReviews(routeId);
        setReviews(data);
      } catch (error) {
        console.error("Ошибка загрузки отзывов:", error);
      }
    };
    fetchReviews();
  }, [routeId]);

  useEffect(() => {
    const checkAccess = async () => {
      if (currentUser && currentUser.role === "tourist") {
        try {
          const response = await fetch(`http://localhost:3001/api/bookings/check-completed/${routeId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await response.json();
          setHasAccess(data);
        } catch (error) {
          console.error("Ошибка проверки доступа:", error);
          setHasAccess(false);
        }
      }
      setCheckingAccess(false);
    };
    checkAccess();
  }, [routeId, currentUser]);

  const showNotification = (message: string, type: string = "success"): void => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const sendReview = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      if (editingReview) {
        await apiService.updateRouteReview(editingReview.id, { rating, text });
        setReviews(prev => prev.map(r => r.id === editingReview.id ? { ...r, rating, text } : r));
        showNotification("Отзыв успешно обновлен!", "success");
      } else {
        await apiService.addRouteReview(routeId, { rating, text });
        const newReviews = await apiService.getRouteReviews(routeId);
        setReviews(newReviews);
        showNotification("Отзыв успешно добавлен!", "success");
      }
      
      setShowForm(false);
      setEditingReview(null);
      setRating(5);
      setText("");
    } catch (error) {
      console.error("Ошибка при сохранении отзыва:", error);
      showNotification("Произошла ошибка при сохранении отзыва", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const editReview = (review: RouteReview): void => {
    setEditingReview(review);
    setRating(review.rating);
    setText(review.text);
    setShowForm(true);
  };

  const deleteReview = async (id: number): Promise<void> => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      await apiService.deleteRouteReview(id);
      setReviews(prev => prev.filter(r => r.id !== id));
      setShowForm(false);
      setEditingReview(null);
      setRating(5);
      setText("");
      showNotification("Отзыв успешно удален!", "success");
    } catch (error) {
      console.error("Ошибка при удалении отзыва:", error);
      showNotification("Произошла ошибка при удалении отзыва", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="route-reviews-wrapper">
      <h2 className="route-reviews-title">Отзывы о маршруте</h2>

      {notification.message && (
        <div className={`route-review-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="route-reviews-list">
        {reviews.map(r => (
          <RouteReviewCard 
            key={r.id}
            review={r}
            currentUser={currentUser}
            onEdit={editReview}
            onDelete={deleteReview}
            formatDate={formatDate}
          />
        ))}
      </div>

      {!showForm && (
        <>
          {!currentUser ? (
            <div className="route-review-access-message">
              <p className="access-message-text">Войдите, чтобы оставить отзыв</p>
              <button 
                className="route-reviews-add-btn"
                onClick={() => window.location.href = "/login"}
              >
                Войти
              </button>
            </div>
          ) : currentUser.role !== "tourist" ? (
            <div className="route-review-access-message">
              <p className="access-message-text">Только туристы могут оставлять отзывы на маршруты</p>
            </div>
          ) : checkingAccess ? (
            <div className="route-review-access-message">
              <p className="access-message-text">Проверка доступа...</p>
            </div>
          ) : !hasAccess ? (
            <div className="route-review-access-message">
              <p className="access-message-text">Вы не можете оставить отзыв на маршрут, на котором не были</p>
            </div>
          ) : (
            <button 
              className="route-reviews-add-btn" 
              onClick={() => setShowForm(true)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Обработка..." : "Добавить отзыв"}
            </button>
          )}
        </>
      )}

      {showForm && (
        <form className="route-review-form" onSubmit={sendReview}>
          <label>Оценка:</label>
          <StarRating value={rating} onChange={setRating} allowHalf disabled={isSubmitting} />

          <label>Отзыв:</label>
          <textarea
            required
            value={text}
            onChange={e => setText(e.target.value)}
            className="route-review-input"
            placeholder="Поделитесь вашими впечатлениями о маршруте..."
            rows={5}
            disabled={isSubmitting}
          />

          <div className="route-form-btns">
            <button 
              type="submit" 
              className="route-reviews-add-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка..." : (editingReview ? "Сохранить" : "Отправить")}
            </button>
            <button
              type="button"
              onClick={() => { 
                if (!isSubmitting) {
                  setShowForm(false); 
                  setEditingReview(null);
                  setRating(5);
                  setText("");
                }
              }}
              className="route-review-cancel-btn"
              disabled={isSubmitting}
            >
              Отмена
            </button>
            {editingReview && (
              <button
                type="button"
                onClick={() => !isSubmitting && deleteReview(editingReview.id)}
                className="route-review-delete-btn"
                disabled={isSubmitting}
              >
                Удалить
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}