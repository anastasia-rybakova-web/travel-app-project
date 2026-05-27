import React, { useState, FormEvent } from "react";
import "./SearchBar.css";

interface SearchParams {
  keyword: string;
  type: string;
  price: string;
  rating: string;
  startDate: string;
  endDate: string;
  scrollToTop?: boolean;
}

interface SearchBarRoutesProps {
  onSearch: (params: {
    keyword: string;
    type: string;
    price: number | undefined;
    rating: number | undefined;
    startDate: string;
    endDate: string;
    scrollToTop?: boolean;
  }) => void;
}

export default function SearchBarRoutes({ onSearch }: SearchBarRoutesProps): React.JSX.Element {
  const [keyword, setKeyword] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSearch({
      keyword,
      type,
      price: price ? parseFloat(price) : undefined,
      rating: rating ? parseFloat(rating) : undefined,
      startDate,
      endDate,
    });
  };

  const handleReset = (): void => {
    setKeyword("");
    setType("");
    setPrice("");
    setRating("");
    setStartDate("");
    setEndDate("");
    onSearch({
      keyword: "",
      type: "",
      price: undefined,
      rating: undefined,
      startDate: "",
      endDate: "",
      scrollToTop: true,
    });
  };

  return (
    <section className="routes-search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите ключевое слово"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Тип маршрута (исторический, культурный...)"
          value={type}
          onChange={e => setType(e.target.value)}
        />

        <input
          type="number"
          placeholder="Макс. цена"
          value={price}
          onChange={e => setPrice(e.target.value)}
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

        <div className="date-input-wrapper">
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="date-input"
          />
          <span className="date-label">Дата начала</span>
        </div>

        <div className="date-input-wrapper">
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="date-input"
            min={startDate || ""}
          />
          <span className="date-label">Дата окончания</span>
        </div>

        <button type="submit">Найти</button>
        <button type="button" onClick={handleReset}>Сбросить</button>
      </form>
    </section>
  );
}