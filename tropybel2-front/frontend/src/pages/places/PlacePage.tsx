import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiService } from "../../services/api.service";
import { Place } from "../../types/user.types";
import Footer from "../../components/mainpage/Footer";
import PlaceReviews from "../../components/placespage/place/Reviews";
import "./PlacePage.css";

export default function PlacePage(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlace = async () => {
      if (!id) return;
      try {
        const data = await apiService.getPlaceById(parseInt(id));
        setPlace(data);
      } catch (error) {
        console.error("Ошибка загрузки места:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id]);

  if (loading) return <p className="place-page-loading">Загрузка...</p>;
  if (!place) return <p className="place-page-loading">Место не найдено</p>;

  return (
    <section className="place-page-section">
      {place.photos?.[0] && (
        <div className="place-main-image">
          <img src={place.photos[0]} alt={place.title} />
        </div>
      )}

      <div className="place-page-header">
        <Link to="/places" className="back-link">
           Все места
        </Link>
        <h1>{place.title}</h1>
        <div className="place-page-divider">
          <span className="place-page-line">―――</span>
          <span className="place-page-dots">•••</span>
          <span className="place-page-line">―――</span>
        </div>
      </div>

      <div className="place-page-content">
        <div className="place-info-item place-info-address">
          <h3 className="place-info-title">Адрес:</h3>
          <p className="place-info-text">{place.address}</p>
        </div>
        <div className="place-info-item place-info-description">
          <h3 className="place-info-title">Описание:</h3>
          <p className="place-info-text">{place.description}</p>
        </div>
        {place.tags?.length > 0 && (
          <div className="place-info-item place-info-tags">
            <h3 className="place-info-title">Теги:</h3>
            <div className="place-info-text">
              {place.tags.map((tag, idx) => (
                <span key={idx}>{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {place.photos?.length > 0 && (
        <div className="place-gallery">
          <h2 className="place-gallery-title">Фотогалерея</h2>
          <div className="place-gallery-grid">
            {place.photos.map((photo, idx) => (
              <div key={idx} className="place-gallery-item">
                <img 
                  src={photo} 
                  alt={`${place.title} ${idx + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      <PlaceReviews placeId={place.id} />
      <Footer />
    </section>
  );
}