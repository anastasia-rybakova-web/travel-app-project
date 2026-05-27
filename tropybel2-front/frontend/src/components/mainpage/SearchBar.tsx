import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./searchbar.css";

type SearchType = "place" | "route";

export default function SearchBar(): React.JSX.Element {
  const navigate = useNavigate();

  const [type, setType] = useState<SearchType>("place");
  const [keyword, setKeyword] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [routeType, setRouteType] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set("type", type);
    if (keyword) params.set("keyword", keyword);
    if (region) params.set("region", region);
    if (routeType) params.set("routeType", routeType); 
    if (minPrice) params.set("minPrice", minPrice);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="search-bar">
      <form onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => setType(e.target.value as SearchType)}>
          <option value="place">Искать места</option>
          <option value="route">Искать маршруты</option>
        </select>

        <input
          type="text"
          placeholder="Введите ключевое слово"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {type === "place" && (
          <>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">Выберите область</option>
              <option value="Брестская">Брестская</option>
              <option value="Витебская">Витебская</option>
              <option value="Гомельская">Гомельская</option>
              <option value="Гродненская">Гродненская</option>
              <option value="Минская">Минская</option>
              <option value="Могилевская">Могилевская</option>
            </select>
          </>
        )}

        {type === "route" && (
          <>
            <input
              type="text"
              placeholder="Тип маршрута (исторический, культурный...)"
              value={routeType}
              onChange={(e) => setRouteType(e.target.value)}
            />

            <input
              type="number"
              placeholder="Мин. цена"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </>
        )}

        <button type="submit">Поиск</button>
      </form>
    </section>
  );
}