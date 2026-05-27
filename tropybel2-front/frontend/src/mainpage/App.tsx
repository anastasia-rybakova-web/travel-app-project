import React from "react";
import { Routes, Route } from "react-router-dom";

import MainPage from "../pages/MainPage";
import RoutesPage from "../pages/routes/RoutesPage";
import Places from "../pages/places/Places";
import Guides from "../pages/guides/Guides";
import Login from "../pages/login_registr/Login";
import Navbar from "../components/mainpage/Navbar";
import ProfileTourist from "../pages/touristprofile/ProfileTourist";
import ProfileGuide from "../pages/guideprofile/ProfileGuide";
import ProtectedRoute from "../pages/ProtectedRoute";
import Register from "../pages/login_registr/Register";
import PlacePage from "../pages/places/PlacePage";
import RoutePage from "../pages/routes/RoutePage";
import SearchResults from "../pages/SearchResults";
import GuideProfile from "../pages/guides/GuideProfile";

export default function App(): React.JSX.Element {
  return (
    <div className="app">
      <header>
        <Navbar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/routes/:id" element={<RoutePage />} />
          <Route path="/places" element={<Places />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:id" element={<GuideProfile />} />

          <Route
            path="/profile/tourist"
            element={
              <ProtectedRoute role="tourist">
                <ProfileTourist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/guide"
            element={
              <ProtectedRoute role="guide">
                <ProfileGuide />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/places/:id" element={<PlacePage />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>
    </div>
  );
}