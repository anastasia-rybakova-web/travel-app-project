import React, { useState, useEffect } from "react";
import { apiService } from "../../../services/api.service";
import { PlaceReview, User } from "../../../types/user.types";
import ReviewCard from "./ReviewCard";
import StarRating from "./StarRating";
import "./Reviews.css";

interface ReviewsProps {
  placeId: number;
}

export default function Reviews({ placeId }: ReviewsProps): React.JSX.Element {
  const [reviews, setReviews] = useState<PlaceReview[]>([]);
  const [editingReview, setEditingReview] = useState<PlaceReview | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState<string>("");
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
        const data = await apiService.getPlaceReviews(placeId);
        setReviews(data);
      } catch (error) {
        console.error("Ошибка загрузки отзывов:", error);
      }
    };
    fetchReviews();
  }, [placeId]);

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
    let userPhoto = null;
    if (currentUser) {
      try {
        if (currentUser.role === 'tourist') {
          const tourist = await apiService.getTouristProfile(currentUser.id);
          userPhoto = tourist.photo;
        } else if (currentUser.role === 'guide') {
          const guide = await apiService.getGuideProfile(currentUser.id);
          userPhoto = guide.photo;
        }
      } catch (err) {
        console.error("Ошибка получения фото:", err);
      }
    }

    if (editingReview) {
      await apiService.updatePlaceReview(editingReview.id, { 
        rating, 
        text,
        photo: userPhoto 
      });
      setReviews(prev => prev.map(r => r.id === editingReview.id ? { ...r, rating, text, photo: userPhoto } : r));
      showNotification("Отзыв успешно обновлен!", "success");
    } else {
      const newReview = await apiService.addPlaceReview(placeId, { 
        rating, 
        text,
        photo: userPhoto
      });
      setReviews(prev => [newReview, ...prev]);
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

  const editReview = (review: PlaceReview): void => {
    setEditingReview(review);
    setRating(review.rating);
    setText(review.text);
    setShowForm(true);
  };

  const deleteReview = async (id: number): Promise<void> => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      await apiService.deletePlaceReview(id);
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
    <div className="place-reviews-wrapper">
      <h2 className="place-reviews-title">Отзывы</h2>

      {notification.message && (
        <div className={`place-review-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="place-reviews-list">
        {reviews.map(r => (
          <ReviewCard 
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
        <button 
          className="place-reviews-add-btn" 
          onClick={() => {
            if (!currentUser) {
              window.location.href = "/login";
              return;
            }
            setShowForm(true);
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Обработка..." : "Добавить отзыв"}
        </button>
      )}

      {showForm && (
        <form className="place-review-form" onSubmit={sendReview}>
          <label>Оценка:</label>
          <StarRating 
            value={rating} 
            onChange={setRating} 
            allowHalf 
            readonly={isSubmitting}
          />

          <label>Отзыв:</label>
          <textarea
            required
            value={text}
            onChange={e => setText(e.target.value)}
            className="place-review-input"
            placeholder="Поделитесь вашими впечатлениями об этом месте..."
            disabled={isSubmitting}
          />

          <div className="place-form-btns">
            <button 
              type="submit" 
              className="place-reviews-add-btn"
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
              className="place-review-cancel-btn"
              disabled={isSubmitting}
            >
              Отмена
            </button>
            {editingReview && (
              <button 
                type="button" 
                onClick={() => !isSubmitting && deleteReview(editingReview.id)} 
                className="place-review-delete-btn"
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