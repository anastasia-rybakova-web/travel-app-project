import React, { useState } from "react";
import { apiService } from "../../../services/api.service";
import "./RouteForm.css";

interface Place {
  id: number;
  title: string;
}

interface RouteFormData {
  id?: number;
  title: string;
  shortDescription: string;
  description: string;
  duration: string;
  people: string;
  price: string;
  type: string;
  photos: string[];
  rating: number;
  guideUserId?: number;
  places: number[];
  dates: string[];
}

interface RouteFormProps {
  route?: {
    id?: number;
    title: string;
    shortDescription: string;
    description: string;
    duration: string;
    people: string;
    price: string;
    type: string;
    photos: string[];
    rating: number;
    places?: number[];
    dates?: string[];
  };
  places: Place[];
  onSave: (route: RouteFormData) => void;
  onCancel: () => void;
  onDelete?: (id: number) => void;
}

export default function RouteForm({ route, places, onSave, onCancel, onDelete }: RouteFormProps): React.JSX.Element {
  const [title, setTitle] = useState<string>(route?.title || "");
  const [shortDesc, setShortDesc] = useState<string>(route?.shortDescription || "");
  const [description, setDescription] = useState<string>(route?.description || "");
  const [duration, setDuration] = useState<string>(route?.duration || "");
  const [people, setPeople] = useState<string>(route?.people || "");
  const [price, setPrice] = useState<string>(route?.price || "");
  const [type, setType] = useState<string>(route?.type || "");
  const [newDate, setNewDate] = useState<string>("");
  const [dates, setDates] = useState<string[]>(route?.dates || []);
  const [selectedPlaces, setSelectedPlaces] = useState<number[]>(route?.places || []);
  const [placeSearch, setPlaceSearch] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [photos, setPhotos] = useState<string[]>(route?.photos || []);

  const addDate = (): void => {
    if (!newDate || dates.includes(newDate)) return;
    setDates([...dates, newDate]);
    setNewDate("");
  };

  const removeDate = (d: string): void => {
    setDates(dates.filter(date => date !== d));
  };

  const addPlace = (id: number): void => {
    if (!selectedPlaces.includes(id)) setSelectedPlaces([...selectedPlaces, id]);
    setPlaceSearch("");
  };

  const removePlace = (id: number): void => {
    setSelectedPlaces(selectedPlaces.filter(p => p !== id));
  };

  const filteredPlaces = places.filter(
    p => p.title.toLowerCase().includes(placeSearch.toLowerCase()) && !selectedPlaces.includes(p.id)
  );

  const addPhoto = (): void => {
    if (!photoUrl.trim()) return;
    setPhotos([...photos, photoUrl.trim()]);
    setPhotoUrl("");
  };

  const removePhoto = (url: string): void => {
    setPhotos(photos.filter(p => p !== url));
  };

  const saveRoute = (): void => {
    onSave({
      id: route?.id,
      title,
      shortDescription: shortDesc,
      description,
      duration,
      people,
      price,
      type,
      photos,
      rating: route?.rating ?? 0,
      places: selectedPlaces,
      dates,
    });
  };

  const deleteRoute = async (): Promise<void> => {
    if (!route?.id) return;
    await apiService.deleteRoute(route.id);
    if (onDelete && route.id) onDelete(route.id);
    onCancel();
  };

  return (
    <div className="route-form-card">
      <h2>{route?.id ? "Редактировать маршрут" : "Добавить маршрут"}</h2>

      <label>Название</label>
      <input value={title} onChange={e => setTitle(e.target.value)} />

      <label>Краткое описание</label>
      <input value={shortDesc} onChange={e => setShortDesc(e.target.value)} />

      <label>Описание</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} />

      <label>Длительность ( _ дня/дней)</label>
      <input value={duration} onChange={e => setDuration(e.target.value)} />

      <label>Количество человек</label>
      <input value={people} onChange={e => setPeople(e.target.value)} />

      <label>Цена (руб./чел)</label>
      <input value={price} onChange={e => setPrice(e.target.value)} />

      <label>Тип маршрута</label>
      <input value={type} onChange={e => setType(e.target.value)} />

      <label>Доступные даты</label>
      <div className="date-add-row">
        <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
        <button className="btn gold" onClick={addDate}>Добавить</button>
      </div>
      <div className="date-list">
        {dates.map(d => (
          <div className="date-item" key={d}>
            <span>{d}</span>
            <button className="delete-date" onClick={() => removeDate(d)}>✖</button>
          </div>
        ))}
      </div>

      <label>Добавить место по поиску</label>
      <input
        type="text"
        placeholder="Введите название..."
        value={placeSearch}
        onChange={e => setPlaceSearch(e.target.value)}
      />
      {placeSearch.trim() !== "" && (
        <div className="place-search-results">
          {filteredPlaces.length === 0 && <div className="no-results">Ничего не найдено</div>}
          {filteredPlaces.map(p => (
            <div key={p.id} className="place-search-item" onClick={() => addPlace(p.id)}>
              {p.title}
            </div>
          ))}
        </div>
      )}
      <div className="selected-places">
        {selectedPlaces.map(id => {
          const place = places.find(p => p.id === id);
          if (!place) return null;
          return (
            <div className="selected-place-item" key={id}>
              <span>{place.title}</span>
              <button className="delete-place" onClick={() => removePlace(id)}>✖</button>
            </div>
          );
        })}
      </div>

      <label>Фотографии (URL)</label>
      <div className="photo-add-row">
        <input value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} placeholder="https://..../photo.jpg" />
        <button className="btn gold" onClick={addPhoto}>Добавить</button>
      </div>
      <div className="photo-preview-list">
        {photos.map(url => (
          <div className="photo-preview" key={url}>
            <img src={url} alt="preview" />
            <button className="delete-photo" onClick={() => removePhoto(url)}>✖</button>
          </div>
        ))}
      </div>

      <div className="form-buttons">
        <button className="btn gold" onClick={saveRoute}>Сохранить</button>
        <button className="btn gold" onClick={onCancel}>Отмена</button>

        {route?.id && (
          <button className="btn red" onClick={deleteRoute}>Удалить</button>
        )}
      </div>
    </div>
  );
}