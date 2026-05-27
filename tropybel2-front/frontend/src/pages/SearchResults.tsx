import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { apiService } from "../services/api.service";
import { Place, Route } from "../types/user.types";
import PlaceCard from "../components/placespage/place/PlaceCard";
import RouteCard from "../components/routespage/route/RouteCard";
import Footer from "../components/mainpage/Footer";
import "./SearchResults.css";

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

export default function SearchResults(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const [places, setPlaces] = useState<Place[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const type = searchParams.get("type");
  const keyword = searchParams.get("keyword")?.toLowerCase() || "";
  const region = searchParams.get("region") || "";
  const routeType = searchParams.get("routeType") || "";
  const minPrice = Number(searchParams.get("minPrice") || 0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (type === "place") {
          const placesData = await apiService.getPlaces();
          setPlaces(placesData);
        } else if (type === "route") {
          const routesData = await apiService.getRoutes();
          setRoutes(routesData);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  const filteredPlaces = (): Place[] => {
    return places.filter(p => {
      const matchKeyword = keyword === "" || 
        p.title.toLowerCase().includes(keyword) ||
        p.description?.toLowerCase().includes(keyword) ||
        p.shortDescription?.toLowerCase().includes(keyword);

      const matchRegion = !region || p.region === region;

      return matchKeyword && matchRegion;
    });
  };

  const filteredRoutes = (): Route[] => {
    return routes.filter(r => {
      const matchKeyword = keyword === "" ||
        r.title?.toLowerCase().includes(keyword) ||
        r.description?.toLowerCase().includes(keyword) ||
        r.shortDescription?.toLowerCase().includes(keyword);

      let matchRouteType = true;
      if (routeType?.trim()) {
        const typeLower = routeType.toLowerCase();
        const routeTypeLower = r.type?.toLowerCase() || "";
        
        if (!routeTypeLower) {
          matchRouteType = false;
        } else {
          if (routeTypeLower.includes(typeLower) || typeLower.includes(routeTypeLower)) {
            matchRouteType = true;
          } else {
            matchRouteType = findRelatedWords(typeLower, routeTypeLower);

            if (!matchRouteType) {
              const routeTypes = routeTypeLower
                .split(/[,;|/и\s]+/)
                .map(t => t.trim())
                .filter(t => t.length > 0);
              
              matchRouteType = routeTypes.some(rt => 
                rt.includes(typeLower) || 
                typeLower.includes(rt) ||
                findRelatedWords(typeLower, rt)
              );
            }
          }
        }
      }

      const matchPrice = !minPrice || Number(r.price) >= minPrice;

      return matchKeyword && matchRouteType && matchPrice;
    });
  };

  if (loading) {
    return <div className="search-results-loading">Загрузка...</div>;
  }

  return (
    <section className="search-pesult-section">
      <div className="search-pesult-container" style={{ padding: "80px 0" }}>
        <h2>Результаты поиска</h2>
        
        <div style={{ marginBottom: "20px", color: "#666" }}>
          {type === "place" && (
            <div className="search-pesult-params">
              <p>Параметры поиска: Места
                {keyword && `, Ключевое слово: "${keyword}"`}
                {region && `, Область: ${region}`}
              </p>
            </div>
          )}
          {type === "route" && (
            <div className="search-pesult-params">
              <p>Параметры поиска: Маршруты
                {keyword && `, Ключевое слово: "${keyword}"`}
                {routeType && `, Тип маршрута: "${routeType}"`}
                {minPrice > 0 && `, Мин. цена: ${minPrice}`}
              </p>
            </div>
          )}
        </div>

        {type === "place" && filteredPlaces().length === 0 && (
          <p className="search-pesult-no-results-message">Ничего не найдено по заданным критериям</p>
        )}
        
        {type === "route" && filteredRoutes().length === 0 && (
          <p className="search-pesult-no-results-message">Ничего не найдено по заданным критериям</p>
        )}

        <div className="search-pesult-places-page-grid">
          {type === "place" &&
            filteredPlaces().map(place => <PlaceCard key={place.id} place={place} />)}

          {type === "route" &&
            filteredRoutes().map(route => <RouteCard key={route.id} route={route} allPlaces={[]} />)}
        </div>
      </div>
      <Footer />
    </section>
  );
}