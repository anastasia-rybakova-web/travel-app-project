import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/user.types";
import TouristProfileEditor from "../../components/touristprofile/TouristProfileEditor";
import BookingsTourist from "../../components/touristprofile/BookingsTourist";
import HistoryTourist from "../../components/touristprofile/HistoryTourist";
import UpcomingTourist from "../../components/touristprofile/UpcomingTourist";
import "./TouristProfile.css";

export default function ProfileTourist(): React.JSX.Element {
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
    if (parsedUser.role !== "tourist") {
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
    <div className="tourist-profile-dashboard">
      <h1>Личный кабинет туриста</h1>

      <div className="tourist-profile-tabs">
        <button 
          className={tab === "profile" ? "active" : ""}
          onClick={() => setTab("profile")}
        >
          Мой профиль
        </button>
        <button 
          className={tab === "history" ? "active" : ""}
          onClick={() => setTab("history")}
        >
          История
        </button>
        <button 
          className={tab === "upcoming" ? "active" : ""}
          onClick={() => setTab("upcoming")}
        >
          Предстоящие
        </button>
        <button 
          className={tab === "bookings" ? "active" : ""}
          onClick={() => setTab("bookings")}
        >
          Текущие заявки
        </button>

        <button onClick={handleLogout} className="tourist-profile-logout-btn">
          Выйти
        </button>
      </div>

      <div className="tourist-profile-content">
        {tab === "profile" && <TouristProfileEditor user={user} />}
        {tab === "history" && <HistoryTourist user={user} />}
        {tab === "upcoming" && <UpcomingTourist user={user} />}
        {tab === "bookings" && <BookingsTourist user={user} />}
      </div>
    </div>
  );
}