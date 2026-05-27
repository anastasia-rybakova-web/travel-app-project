import React, { useState, useEffect } from "react";
import "./SliderPlaces.css";

interface Slide {
  image: string;
  title: string;
  text: string;
}

const slides: Slide[] = [
  { image: "/images/places/slide1.png", title: "Планируй свое путешествие", text: "Выбирай маршруты и наслаждайся красотой природы без лишних хлопот." },
  { image: "/images/places/slide2.png", title: "Открой для себя Беларусь", text: "Путешествуй по историческим городам и живописным уголкам страны." },
  { image: "/images/places/slide3.png", title: "Путешествуй с комфортом", text: "Маршруты составлены опытными гидами, которые заботятся о Вашем удобстве." },
  { image: "/images/places/slide4.png", title: "Незабываемые впечатления", text: "Открой скрытые тайны и жемчужины Беларуси, погрузись в мифы и легенды." },
  { image: "/images/places/slide5.png", title: "Начни свое путешествие сейчас", text: "Забронируй тур и открой новые горизонты вместе с TropyBel." }
];

export default function SliderPlaces(): React.JSX.Element {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-places" id="headimagesslide">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`slide-places ${i === current ? "places-active" : ""}`}
          style={{ backgroundImage: `url(${s.image})` }}
        >
          <div className="overlay-places">
            <h2 className="places-title">{s.title}</h2>
            <p className="places-text">{s.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}