import React, { useState, useEffect, useRef } from "react";
import { apiService } from "../../services/api.service";
import { Place } from "../../types/user.types";
import SliderPlaces from "../../components/placespage/SliderPlaces";
import PlacesSearchBar from "../../components/placespage/PlacesSearchBar";
import PlaceCard from "../../components/placespage/place/PlaceCard";
import Footer from "../../components/mainpage/Footer";
import "./Places.css";

interface SearchParams {
  keyword?: string;
  region?: string;
  tag?: string;
  rating?: number| string;
  scrollToTop?: boolean;
}

const regionMap: Record<string, string> = {
  brest: "Брестская",
  vitebsk: "Витебская",
  gomel: "Гомельская",
  grodno: "Гродненская",
  minsk: "Минская",
  mogilev: "Могилевская",
};

function normalizeRegionName(raw: string = ""): string | null {
  const lower = raw.trim().toLowerCase();
  if (lower.includes("брест")) return regionMap.brest;
  if (lower.includes("витеб")) return regionMap.vitebsk;
  if (lower.includes("гоме")) return regionMap.gomel;
  if (lower.includes("грод")) return regionMap.grodno;
  if (lower.includes("минск")) return regionMap.minsk;
  if (lower.includes("могил")) return regionMap.mogilev;
  return null;
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

export default function Places(): React.JSX.Element {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filtered, setFiltered] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const regionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await apiService.getPlaces();
        setPlaces(data);
        setFiltered(data);
      } catch (error) {
        console.error("Ошибка загрузки мест:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  const handleSearch = ({ keyword, region, tag, rating, scrollToTop }: SearchParams): void => {
    let result = [...places];

    if (keyword?.trim()) {
      const low = keyword.toLowerCase();
      result = result.filter(p => {
        const title = p.title?.toLowerCase() || "";
        const desc = p.description?.toLowerCase() || "";
        const shortDesc = p.shortDescription?.toLowerCase() || "";
        const addr = p.address?.toLowerCase() || "";
        const tags = p.tags?.join(" ").toLowerCase() || "";

        return title.includes(low) || desc.includes(low) || shortDesc.includes(low) || addr.includes(low) || tags.includes(low);
      });
    }

    if (region) {
      result = result.filter(p => normalizeRegionName(p.region) === region);
    }
    
    if (tag?.trim()) {
      const tagLower = tag.toLowerCase();
      result = result.filter(p => {
        if (!p.tags || p.tags.length === 0) return false;
        return p.tags.some(placeTag => {
          const placeTagLower = placeTag.toLowerCase();
          if (placeTagLower.includes(tagLower) || tagLower.includes(placeTagLower)) {
            return true;
          }
          if (findRelatedWords(tagLower, placeTagLower)) {
            return true;
          }
          const tagParts = placeTagLower
            .split(/[,;|/и\s]+/)
            .map(t => t.trim())
            .filter(t => t.length > 0);
          return tagParts.some(tagPart => 
            tagPart.includes(tagLower) || 
            tagLower.includes(tagPart) ||
            findRelatedWords(tagLower, tagPart)
          );
        });
      });
    }
    
    if (rating) {
    const ratingNumber = typeof rating === 'string' ? parseInt(rating, 10) : rating;
    if (!isNaN(ratingNumber)) {
      result = result.filter(p => (p.rating || 0) >= ratingNumber);
    }
  }

    setFiltered(result);

    setTimeout(() => {
      if (scrollToTop) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (region) {
        regionRefs.current[region]?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        const firstBlock = document.querySelector(".region-section");
        if (firstBlock) firstBlock.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const grouped: Record<string, Place[]> = {};
  for (const place of filtered) {
    const region = normalizeRegionName(place.region);
    if (!region) continue;
    if (!grouped[region]) grouped[region] = [];
    grouped[region].push(place);
  }

  if (loading) {
    return <div className="places-page-loading">Загрузка...</div>;
  }

  return (
    <section className="places-page-section">
      <SliderPlaces />
      <PlacesSearchBar onSearch={handleSearch} />

      <div className="places-page-container">
        <div className="places-page-header">
          <h2>Лучшие места Беларуси</h2>
          <div className="places-page-divider">
            <span className="places-page-line">―――</span>
            <span className="places-page-dots">•••</span>
            <span className="places-page-line">―――</span>
          </div>
          <p>Путешествуйте по самым красивым уголкам страны — от древних замков и соборов до заповедников и озёр.</p>
        </div>

        {Object.keys(grouped)
          .sort((a, b) => a.localeCompare(b, "ru"))
          .map(region => (
            <div 
              key={region} 
              className="region-section" 
              ref={(el) => { regionRefs.current[region] = el; }}
            >
              <h2 className="region-title">{region} область</h2>
              <div className="places-page-places-page-grid">
                {grouped[region].map(place => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </div>
          ))}

        {filtered.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "40px", fontSize: "18px" }}>Ничего не найдено</p>
        )}
      </div>

      <Footer />
    </section>
  );
}