import React from "react";
import { useNavigate } from "react-router-dom";
import "./BestPlaces.css";

interface Place {
  id: number;
  name: string;
  tours: string;
  image: string;
}

const places: Place[] = [
  { id: 1, name: "Брестская крепость", tours: "5 туров", image: "/images/mainpage/bestplaces/brest_fortress.jpg" },
  { id: 2, name: "Беловежская пуща", tours: "4 тура", image: "/images/mainpage/bestplaces/puscha.jpg" },
  { id: 3, name: "Наносы", tours: "4 тура", image: "/images/mainpage/bestplaces/nanosy.jpg" },
  { id: 4, name: "Костел Святой Троицы", tours: "6 туров", image: "/images/mainpage/bestplaces/troica.jpg" },
  { id: 5, name: "Сула", tours: "2 тура", image: "/images/mainpage/bestplaces/sula.jpeg" },
  { id: 6, name: "Коссовский замок", tours: "3 тура", image: "/images/mainpage/bestplaces/kossovo.jpg" },
  { id: 7, name: "Усадьба Булгаков", tours: "3 тура", image: "/images/mainpage/bestplaces/bulgakov.jpg" },
  { id: 8, name: "Мирский замок", tours: "2 тура", image: "/images/mainpage/bestplaces/mir.jpg" },
];

export default function BestPlaces(): React.JSX.Element {
  const navigate = useNavigate();

  const goToPlacesPage = (): void => {
    navigate("/places");
    window.scrollTo(0, 0);
  };

  return (
    <section className="best-places-section">
      <div className="best-places-container">
        <div className="best-places-header">
          <h2>Лучшие места Беларуси</h2>
          <div className="best-places-divider">
            <span className="best-places-line">―――</span>
            <span className="best-places-dots">•••</span>
            <span className="best-places-line">―――</span>
          </div>
          <p>
            Путешествуйте по самым красивым уголкам страны — от древних замков и
            соборов до заповедников и озёр.
          </p>
        </div>

        <div className="best-places-grid">
          {places.map((place) => (
            <div 
              key={place.id} 
              className="best-places-card-item"
              onClick={goToPlacesPage}
              style={{ cursor: "pointer" }}
            >
              <div
                className="best-places-card"
                style={{ backgroundImage: `url(${place.image})` }}
              >
                <div className="best-places-info">
                  <h3>{place.name}</h3>
                  <span>{place.tours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}