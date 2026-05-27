import React from "react";

import Headimagesslide from "../components/mainpage/blocks/block1slider/Headimagesslide";
import SearchBar from "../components/mainpage/SearchBar";
import ServicesSection from "../components/mainpage/blocks/block2services/ServicesSection";
import PhotoGallery from "../components/mainpage/blocks/block3photo/PhotoGallery";
import AboutSection from "../components/mainpage/blocks/block4about/AboutSection";
import PopularRutes from "../components/mainpage/blocks/block5routes/PopularRutes";
import AboutStatistic from "../components/mainpage/blocks/block6stats/AboutStatistic";
import AboutTeam from "../components/mainpage/blocks/block7team/AboutTeam";
import BestPlaces from "../components/mainpage/blocks/block8places/BestPlaces";
import PartnersSection from "../components/mainpage/blocks/block9partners/PartnersSection";
import Footer from "../components/mainpage/Footer";

export default function MainPage(): React.JSX.Element {
  return (
    <div className="main-page">
      <Headimagesslide />
      <SearchBar />
      <ServicesSection />
      <PhotoGallery />
      <AboutSection />
      <PopularRutes />
      <AboutStatistic />
      <AboutTeam />
      <BestPlaces />
      <PartnersSection />
      <Footer />
    </div>
  );
}