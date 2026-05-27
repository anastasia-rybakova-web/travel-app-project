import React, { useState, useEffect } from "react";
import "./headimagesslide.css";

interface Slide {
  image: string;
  title: string;
  text: string;
}

const slides: Slide[] = [
  { image: "/images/slider/slide1.jpg", title: "Планируй свое путешествие", text: "Выбирай маршруты и наслаждайся красотой природы без лишних хлопот." },
  { image: "/images/slider/slide2.jpg", title: "Открой для себя Беларусь", text: "Путешествуй по историческим городам и живописным уголкам страны." },
  { image: "/images/slider/slide3.jpg", title: "Путешествуй с комфортом", text: "Маршруты составлены опытными гидами, которые заботятся о Вашем удобстве." },
  { image: "/images/slider/slide4.jpg", title: "Незабываемые впечатления", text: "Открой скрытые тайны и жемчужины Беларуси, погрузись в мифы и легенды." },
  { image: "/images/slider/slide5.jpg", title: "Начни свое путешествие сейчас", text: "Забронируй тур и открой новые горизонты вместе с TropyBel." }
];

export default function Headimagesslide(): React.JSX.Element {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-slider" id="headimagesslide">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`hero-slide ${i === current ? "hero-active" : ""}`}
          style={{ backgroundImage: `url(${s.image})` }}
        >
          <div className="hero-overlay">
            <h2 className="hero-title">{s.title}</h2>
            <p className="hero-text">{s.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}