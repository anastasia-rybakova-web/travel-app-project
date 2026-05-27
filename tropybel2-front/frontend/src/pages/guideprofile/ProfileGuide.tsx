import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GuideProfileEditor from "../../components/guideprofile/GuideProfileEditor";
import PlacesList from "../../components/guideprofile/places/PlacesList";
import RoutesList from "../../components/guideprofile/routes/RoutesList";
import BookingsList from "../../components/guideprofile/bookings/BookingsList";
import "./ProfileGuide.css";

interface User {
  id: number;
  role: "guide" | "tourist";
  username: string;
}

export default function ProfileGuide(): React.JSX.Element {
  const [tab, setTab] = useState<string>("profile");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(userStr);
    if (parsedUser.role !== "guide") {
      navigate("/login");
      return;
    }
    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = (): void => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="guide-dashboard">
      <h1>Личный кабинет гида</h1>

      <div className="guide-tabs">
        <button 
          className={tab === "profile" ? "active" : ""}
          onClick={() => setTab("profile")}
        >
          Мой профиль
        </button>
        <button 
          className={tab === "places" ? "active" : ""}
          onClick={() => setTab("places")}
        >
          Мои места
        </button>
        <button 
          className={tab === "routes" ? "active" : ""}
          onClick={() => setTab("routes")}
        >
          Мои маршруты
        </button>
        <button 
          className={tab === "bookings" ? "active" : ""}
          onClick={() => setTab("bookings")}
        >
          Бронирования
        </button>

        <button onClick={handleLogout} className="logout-btn">
          Выйти
        </button>
      </div>

      <div className="guide-content">
        {tab === "profile" && <GuideProfileEditor user={user} />}
        {tab === "places" && <PlacesList user={user} />}
        {tab === "routes" && <RoutesList user={user} />}
        {tab === "bookings" && <BookingsList user={user} />}
      </div>
    </div>
  );
}