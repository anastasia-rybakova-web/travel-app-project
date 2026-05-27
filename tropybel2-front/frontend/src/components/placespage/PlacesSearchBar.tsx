import React, { useState, FormEvent } from "react";
import "./PlacesSearchBar.css";

interface SearchParams {
  keyword: string;
  region: string;
  tag: string;
  rating: string;
  scrollToTop?: boolean;
}

interface PlacesSearchBarProps {
  onSearch: (params: { keyword: string; region: string; tag: string; rating: string; scrollToTop?: boolean }) => void;
}

export default function PlacesSearchBar({ onSearch }: PlacesSearchBarProps): React.JSX.Element {
  const [keyword, setKeyword] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [rating, setRating] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSearch({ keyword, region, tag, rating });
  };

  const handleReset = (): void => {
    setKeyword("");
    setRegion("");
    setTag("");
    setRating("");
    onSearch({ keyword: "", region: "", tag: "", rating: "", scrollToTop: true });
  };

  return (
    <section className="places-search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите ключевое слово"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />

        <select value={region} onChange={e => setRegion(e.target.value)}>
          <option value="">Выберите область</option>
          <option value="Брестская">Брестская</option>
          <option value="Витебская">Витебская</option>
          <option value="Гомельская">Гомельская</option>
          <option value="Гродненская">Гродненская</option>
          <option value="Минская">Минская</option>
          <option value="Могилевская">Могилевская</option>
        </select>

        <input
          type="text"
          placeholder="Тег (историческое, культурное, природа...)"
          value={tag}
          onChange={e => setTag(e.target.value)}
        />

        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="Мин. рейтинг"
          value={rating}
          onChange={e => setRating(e.target.value)}
        />

        <button type="submit">Найти</button>
        <button type="button" onClick={handleReset}>
          Сбросить
        </button>
      </form>
    </section>
  );
}