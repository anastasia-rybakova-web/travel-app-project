import React, { useState, useEffect } from "react";
import { apiService } from "../../services/api.service";
import { Route, Place } from "../../types/user.types";
import SearchBarRoutes from "../../components/routespage/SearchBar";
import RouteCard from "../../components/routespage/route/RouteCard";
import Headimagesslide from "../../components/routespage/SliderRoutes";
import Footer from "../../components/mainpage/Footer";
import "./RoutesPage.css";

interface SearchParams {
  keyword?: string;
  type?: string;
  price?: number;
  rating?: number;
  startDate?: string;
  endDate?: string;
  scrollToTop?: boolean;
}

function findRelatedWords(searchWord: string, targetWord: string): boolean {
  const searchLower = searchWord.toLowerCase();
  const targetLower = targetWord.toLowerCase();
  
  if (searchLower === targetLower || 
      targetLower.includes(searchLower) || 
      searchLower.includes(targetLower)) {
    return true;
  }
  
  const wordRoots: Record<string, string[]> = {
    'истори': ['исторический', 'история', 'исторично', 'историк'],
    'культур': ['культурный', 'культура', 'культурно'],
    'природ': ['природный', 'природа', 'природно'],
    'развлека': ['развлекательный', 'развлечение', 'развлекательно'],
    'актив': ['активный', 'активность', 'актив', 'активно'],
    'экскурс': ['экскурсионный', 'экскурсия', 'экскурсовод'],
    'гастроном': ['гастрономический', 'гастрономия'],
    'религи': ['религиозный', 'религия'],
    'архитектур': ['архитектурный', 'архитектура'],
    'музей': ['музейный', 'музей'],
    'вод': ['водный', 'вода'],
    'лес': ['лесной', 'лес'],
    'гор': ['горный', 'горы']
  };

  for (const [root, variations] of Object.entries(wordRoots)) {
    if (searchLower.includes(root) || searchLower.startsWith(root)) {
      if (variations.some(v => targetLower.includes(v) || targetLower.startsWith(v))) {
        return true;
      }
    }
    if (targetLower.includes(root) || targetLower.startsWith(root)) {
      if (variations.some(v => searchLower.includes(v) || searchLower.startsWith(v))) {
        return true;
      }
    }
  }

  const commonSuffixes = ['ный', 'ная', 'ное', 'ные', 'ий', 'ая', 'ое', 'ые', 'ость', 'ия'];

  let searchRoot = searchLower;
  let targetRoot = targetLower;
  
  for (const suffix of commonSuffixes) {
    if (searchRoot.endsWith(suffix)) {
      searchRoot = searchRoot.slice(0, -suffix.length);
    }
    if (targetRoot.endsWith(suffix)) {
      targetRoot = targetRoot.slice(0, -suffix.length);
    }
  }

  if (searchRoot === targetRoot || 
      searchRoot.includes(targetRoot) || 
      targetRoot.includes(searchRoot)) {
    return true;
  }
 
  const minLength = Math.min(searchRoot.length, targetRoot.length);
  if (minLength > 3) {
    let matches = 0;
    for (let i = 0; i < Math.min(searchRoot.length, targetRoot.length); i++) {
      if (searchRoot[i] === targetRoot[i]) matches++;
    }
    if (matches / minLength > 0.7) {
      return true;
    }
  }
  
  return false;
}

export default function RoutesPage(): React.JSX.Element {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filtered, setFiltered] = useState<Route[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [routesData, placesData] = await Promise.all([
          apiService.getRoutes(),
          apiService.getPlaces()
        ]);
        setRoutes(routesData);
        setFiltered(routesData);
        setPlaces(placesData);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = ({ keyword, type, price, rating, startDate, endDate, scrollToTop }: SearchParams): void => {
    let result = [...routes];

    if (keyword?.trim()) {
      const low = keyword.toLowerCase();
      result = result.filter(r =>
        r.title?.toLowerCase().includes(low) ||
        r.description?.toLowerCase().includes(low) ||
        r.shortDescription?.toLowerCase().includes(low)
      );
    }

    if (type?.trim()) {
  const typeLower = type.toLowerCase().trim();
  result = result.filter(r => {
    if (!r.type) return false;
    
    const routeTypeLower = r.type.toLowerCase().trim();
    if (routeTypeLower === typeLower) return true;
    
    if (routeTypeLower.includes(typeLower) || typeLower.includes(routeTypeLower)) {
      return true;
    }
    const routeTypes = routeTypeLower
      .split(/[,;|/и\s]+/)
      .map(t => t.trim())
      .filter(t => t.length > 0);
    const matched = routeTypes.some(routeType => 
      routeType === typeLower ||
      routeType.includes(typeLower) ||
      typeLower.includes(routeType) ||
      findRelatedWords(typeLower, routeType)
    );
    
    if (matched) return true;
    
    return findRelatedWords(typeLower, routeTypeLower);
  });
}
    
    if (price) {
      result = result.filter(r => Number(r.price) <= price);
    }
    
    if (rating) {
      result = result.filter(r => (r.rating || 0) >= rating);
    }
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      result = result.filter(r => {
        if (!r.routeDates || r.routeDates.length === 0) return false;
        
        return r.routeDates.some(rd => {
          const date = new Date(rd.date);
          return date >= start && date <= end;
        });
      });
    } else if (startDate) {
      const start = new Date(startDate);
      result = result.filter(r => {
        if (!r.routeDates || r.routeDates.length === 0) return false;
        return r.routeDates.some(rd => new Date(rd.date) >= start);
      });
    } else if (endDate) {
      const end = new Date(endDate);
      result = result.filter(r => {
        if (!r.routeDates || r.routeDates.length === 0) return false;
        return r.routeDates.some(rd => new Date(rd.date) <= end);
      });
    }

    setFiltered(result);

    if (scrollToTop) {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    }
  };

  if (loading) {
    return <div className="routes-page-loading">Загрузка...</div>;
  }

  return (
    <section className="routes-page-section">
      <Headimagesslide />
      <SearchBarRoutes onSearch={handleSearch} />

      <div className="routes-page-container">
        <div className="routes-page-header">
          <h2>Готовые маршруты путешествий</h2>
          <div className="routes-page-divider">
            <span className="routes-page-line">―――</span>
            <span className="routes-page-dots">•••</span>
            <span className="routes-page-line">―――</span>
          </div>
          <p>Выбирайте лучшие авторские маршруты по Беларуси.</p>
        </div>

        <div className="routes-page-grid">
          {filtered.map(route => (
            <RouteCard key={route.id} route={route} allPlaces={places} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="routes-page-no-results">Ничего не найдено</p>
        )}
      </div>

      <Footer />
    </section>
  );
}