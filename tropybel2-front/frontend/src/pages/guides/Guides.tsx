import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../services/api.service";
import { GuideProfile } from "../../types/user.types";
import "./Guides.css";

export default function Guides(): React.JSX.Element {
  const [guides, setGuides] = useState<GuideProfile[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<GuideProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const data = await apiService.getAllGuides();
        setGuides(data);
        setFilteredGuides(data);
      } catch (error) {
        console.error("Ошибка загрузки гидов:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredGuides(guides);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = guides.filter(guide => {
      const name = guide.name?.toLowerCase() || "";
      const about = guide.about?.toLowerCase() || "";
      
      return name.includes(term) || about.includes(term);
    });
    
    setFilteredGuides(filtered);
  }, [searchTerm, guides]);

  const handleViewProfile = (guideId: number): void => {
    navigate(`/guides/${guideId}`);
  };

  const formatRating = (rating: number | null | undefined): string => {
    if (!rating) return "0.0";
    const num = typeof rating === 'number' ? rating : parseFloat(String(rating));
    return isNaN(num) ? "0.0" : num.toFixed(1);
  };

  if (loading) {
    return (
      <div className="guides-page">
        <div className="guides-loading">Загрузка гидов...</div>
      </div>
    );
  }

  return (
    <section className="guides-page">
      <div className="guides-header">
        <h1 className="guides-title">Наши гиды</h1>
        <div className="guides-divider">
          <span className="guides-line">―――</span>
          <span className="guides-dots">•••</span>
          <span className="guides-line">―――</span>
        </div>
        <p className="guides-subtitle">
          Профессиональные гиды с большим опытом работы. Выбирайте специалиста по интересам и планируйте незабываемые путешествия!
        </p>
        
        <div className="guides-search-container">
          <input
            type="text"
            className="guides-search-input"
            placeholder="Поиск гида по имени или описанию..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="guides-container">
        {filteredGuides.length === 0 ? (
          <div className="guides-empty">
            <p>Гиды не найдены</p>
            {searchTerm && <button onClick={() => setSearchTerm("")} className="clear-search-btn">Очистить поиск</button>}
          </div>
        ) : (
          <div className="guides-list">
            {filteredGuides.map(guide => (
              <div key={guide.userId} className="guide-card">
                <div className="guide-image-section">
                  <div 
                    className="guide-photo"
                    style={{ 
                      backgroundImage: `url(${guide.photo || 'https://via.placeholder.com/300x400?text=Фото+гида'})` 
                    }}
                  />
                  <div className="guide-rating">
                    <span className="rating-star">★</span>
                    <span className="rating-value">
                      {formatRating(guide.rating)}
                    </span>
                  </div>
                </div>

                <div className="guide-info-section">
                  <div className="guide-header">
                    <h2 className="guide-name">{guide.name}</h2>
                  </div>

                  <div className="guide-about">
                    <h3 className="about-title">О гиде</h3>
                    <p className="about-text">
                      {guide.about || "Информация о гиде пока не добавлена."}
                    </p>
                  </div>

                  <div className="guide-contacts">
                    <h3 className="contacts-title">Контакты</h3>
                    <div className="contact-item">
                      <span className="contact-icon">✆</span>
                      <span className="contact-text">{guide.phone || "Не указан"}</span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">✉</span>
                      <span className="contact-text">{guide.email || "Не указан"}</span>
                    </div>
                  </div>

                  <div className="guide-stats">
  <div className="stat-item">
    <span className="stat-number">{guide.routesCount || 0}</span>
    <span className="stat-label">маршрутов</span>
  </div>
</div>

                  <button 
                    className="guide-profile-btn"
                    onClick={() => handleViewProfile(guide.userId)}
                  >
                    Посмотреть профиль 
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}