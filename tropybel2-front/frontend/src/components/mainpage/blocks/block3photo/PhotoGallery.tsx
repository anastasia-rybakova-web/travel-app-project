import React, { useRef, useEffect } from "react";
import "./photogallery.css";

export default function PhotoGallery(): React.JSX.Element {
  const rowLeftRef = useRef<HTMLDivElement>(null);
  const rowRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const offset = (scrollY - windowHeight / 2) * 0.3;

      if (rowLeftRef.current) {
        rowLeftRef.current.style.transform = `translateX(${offset * 0.4}px)`;
      }
      if (rowRightRef.current) {
        rowRightRef.current.style.transform = `translateX(${-offset * 0.4}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="photo-gallery">
      <div className="photo-row row-left" ref={rowLeftRef}>
        <img src="/images/mainpage/gallery/photo0.jpg" alt="Фото 0" />
        <img src="/images/mainpage/gallery/photo1.jpg" alt="Фото 1" />
        <img src="/images/mainpage/gallery/photo2.jpg" alt="Фото 2" />
        <img src="/images/mainpage/gallery/photo3.jpg" alt="Фото 3" />
        <img src="/images/mainpage/gallery/photo4.jpg" alt="Фото 4" />
      </div>
      <div className="photo-row row-right" ref={rowRightRef}>
        <img src="/images/mainpage/gallery/photo5.jpg" alt="Фото 5" />
        <img src="/images/mainpage/gallery/photo6.png" alt="Фото 6" />
        <img src="/images/mainpage/gallery/photo7.jpg" alt="Фото 7" />
        <img src="/images/mainpage/gallery/photo8.jpeg" alt="Фото 8" />
        <img src="/images/mainpage/gallery/photo9.jpg" alt="Фото 9" />
      </div>
    </section>
  );
}