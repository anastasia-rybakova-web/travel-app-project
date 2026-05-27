import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiService } from "../../services/api.service";
import { GuideProfile as GuideProfileType, Route, GuideReview } from "../../types/user.types";
import StarRating from "./StarRating";
import "./GuideProfile.css";

export default function GuideProfile(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [guide, setGuide] = useState<GuideProfileType | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [reviews, setReviews] = useState<GuideReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("info");

  useEffect(() => {
  const fetchGuideData = async () => {
    if (!id) return;
    try {
      const guideData = await apiService.getGuideById(parseInt(id));
      console.log("Данные гида:", guideData);
      setGuide(guideData);
      setRoutes(guideData.routes || []);
      setReviews(guideData.reviews || []);
    } catch (error) {
      console.error("Ошибка загрузки профиля гида:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchGuideData();
}, [id]);

  const formatRating = (): string => {
    if (!guide) return "0.0";
    const rating = typeof guide.rating === 'number' ? guide.rating : parseFloat(String(guide.rating));
    return isNaN(rating) ? "0.0" : rating.toFixed(1);
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

  if (loading) {
    return (
      <div className="guide-profile-page">
        <div className="profile-loading">Загрузка профиля...</div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="guide-profile-page">
        <div className="profile-error">
          <h2>Гид не найден</h2>
          <p>К сожалению, профиль гида не доступен.</p>
          <Link to="/guides" className="back-to-guides">Вернуться к списку гидов</Link>
        </div>
      </div>
    );
  }

  return (
    <section className="guide-profile-page">
      <div className="profile-header">
        <Link to="/guides" className="back-link">
          Все гиды
        </Link>
        <h1 className="profile-title">Профиль гида</h1>
      </div>

      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-photo-container">
            <div 
              className="profile-photo"
              style={{ 
                backgroundImage: `url(${guide.photo || 'https://via.placeholder.com/400x500'})` 
              }}
            />
            <div className="profile-rating">
              <span className="rating-value-large">{formatRating()}</span>
              <span className="rating-star-large">★</span>
            </div>
          </div>
        </div>

        <div className="profile-right">
          <div className="profile-main-info">
            <h2 className="guide-name-large">{guide.name}</h2>
            
            <div className="profile-tabs">
              <button 
                className={`tab-btn ${activeTab === "info" ? "active" : ""}`}
                onClick={() => setActiveTab("info")}
              >
                Информация
              </button>
              <button 
                className={`tab-btn ${activeTab === "routes" ? "active" : ""}`}
                onClick={() => setActiveTab("routes")}
              >
                Маршруты ({routes.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                Отзывы ({reviews.length})
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "info" ? (
                <div className="info-content">
                  <div className="info-section">
                    <h3 className="section-title">О гиде</h3>
                    <p className="section-text">
                      {guide.about || "Информация о гиде пока не добавлена."}
                    </p>
                  </div>

                  <div className="info-section">
                    <h3 className="section-title">Контакты</h3>
                    <div className="contacts-list">
                      <div className="contact-item-large">
                        <span className="contact-icon-large">✆</span>
                        <div>
                          <div className="contact-label">Телефон</div>
                          <div className="contact-value">{guide.phone || "Не указан"}</div>
                        </div>
                      </div>
                      <div className="contact-item-large">
                        <span className="contact-icon-large">✉</span>
                        <div>
                          <div className="contact-label">Email</div>
                          <div className="contact-value">{guide.email || "Не указан"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3 className="section-title">Статистика</h3>
                    <div className="stats-grid">
                      <div className="stat-card">
                        <div className="stat-number-large">{routes.length}</div>
                        <div className="stat-label-large">маршрут(а/ов)</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number-large">{formatRating()}</div>
                        <div className="stat-label-large">рейтинг</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number-large">{reviews.length}</div>
                        <div className="stat-label-large">отзыв(а/ов)</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeTab === "routes" ? (
                <div className="routes-content">
                  {routes.length === 0 ? (
                    <div className="no-routes">
                      <p>У гида пока нет опубликованных маршрутов.</p>
                    </div>
                  ) : (
                    <div className="routes-list">
                      {routes.map(route => (
                        <div 
                          key={route.id} 
                          className="route-card"
                          onClick={() => navigate(`/routes/${route.id}`)}
                        >
                          <div 
                            className="route-image"
                            style={{ 
                              backgroundImage: `url(${route.photos?.[0] || 'https://via.placeholder.com/400x200'})` 
                            }}
                          />
                          <div className="route-info">
                            <h4 className="route-title">{route.title}</h4>
                            <p className="route-description">{route.shortDescription}</p>
                            <div className="route-meta">
                              <span className="route-price">{route.price} руб/чел</span>
                              <span className="route-duration">{route.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="guide-reviews-content">
                  {reviews.length === 0 ? (
                    <div className="guide-no-reviews">
                      <p>У гида пока нет отзывов.</p>
                    </div>
                  ) : (
                    <div className="guide-reviews-list">
                      {reviews.map(review => (
                        <div key={review.id} className="guide-review-card">
                          <div className="guide-review-top">
                            <img
                              src={review.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                              className="guide-review-avatar"
                              alt={review.username}
                            />
                            <div className="guide-review-meta">
                              <div className="guide-review-name">{review.username}</div>
                              <div className="guide-review-date">
                                {formatDate(review.createdAt)}
                              </div>
                              <StarRating value={Number(review.rating) || 0} readonly allowHalf />
                            </div>
                          </div>
                          
                          <hr className="guide-review-divider" />
                          
                          <p className="guide-review-text">
                            {review.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}