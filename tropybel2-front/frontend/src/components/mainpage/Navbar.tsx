import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

interface User {
  role: "guide" | "tourist";
}

export default function Navbar(): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const getProfilePath = (): string => {
    if (!user) return "/login";
    return user.role === "guide" ? "/profile/guide" : "/profile/tourist";
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        <img src="/images/mainpage/logo.png" alt="TropyBel Logo" />
      </NavLink>

      <div className="nav-links desktop">
        <NavLink to="/" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>Главная</NavLink>
        <NavLink to="/routes" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>Маршруты</NavLink>
        <NavLink to="/places" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>Места</NavLink>
        <NavLink to="/guides" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>Гиды</NavLink>
        <NavLink
          to={getProfilePath()}
          className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
        >
          Профиль
        </NavLink>
        <NavLink to="/login" className={({ isActive }) => isActive ? "menu-button active" : "menu-button"}>Войти</NavLink>
      </div>

      <div className="mobile-menu">
        <button className="burger" onClick={() => setOpen(!open)}>☰</button>

        {open && (
          <div className="dropdown">
            <NavLink to="/routes" className="menu-item">Маршруты</NavLink>
            <NavLink to="/places" className="menu-item">Места</NavLink>
            <NavLink to="/guides" className="menu-item">Гиды</NavLink>
            <NavLink to={getProfilePath()} className="menu-item">
              Профиль
            </NavLink>
            <NavLink to="/login" className="menu-button">Войти</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}