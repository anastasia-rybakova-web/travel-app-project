import React, { useState } from "react";
import { apiService } from "../../../services/api.service";
import "./PlaceForm.css";

interface PlaceFormData {
  id?: number;
  title: string;
  address: string;
  region: string;
  shortDescription: string;
  description: string;
  tags: string[];
  photos: string[];
  rating: number;
  guideUserId?: number;
}

interface PlaceFormProps {
  place?: PlaceFormData;
  onSave: (place: PlaceFormData) => void;
  onCancel: () => void;
  onDelete?: (id: number) => void;
}

export default function PlaceForm({ place, onSave, onCancel, onDelete }: PlaceFormProps): React.JSX.Element {
  const [title, setTitle] = useState<string>(place?.title || "");
  const [address, setAddress] = useState<string>(place?.address || "");
  const [region, setRegion] = useState<string>(place?.region || "");
  const [shortDesc, setShortDesc] = useState<string>(place?.shortDescription || "");
  const [description, setDescription] = useState<string>(place?.description || "");
  const [tags, setTags] = useState<string>(place?.tags?.join(", ") || "");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [photos, setPhotos] = useState<string[]>(place?.photos || []);

  const addPhoto = (): void => {
    if (!photoUrl.trim()) return;
    setPhotos([...photos, photoUrl.trim()]);
    setPhotoUrl("");
  };

  const removePhoto = (url: string): void => {
    setPhotos(photos.filter(p => p !== url));
  };

  const savePlace = (): void => {
    onSave({
      ...place,
      title,
      address,
      region,
      shortDescription: shortDesc,
      description,
      tags: tags.split(",").map(t => t.trim()),
      photos,
      rating: place?.rating ?? 0
    });
  };

  const deletePlace = async (): Promise<void> => {
    if (!place?.id) return;
    await apiService.deletePlace(place.id);
    if (onDelete && place.id) onDelete(place.id);
    onCancel();
  };

  return (
    <div className="place-form-card">
      <h2>{place?.id ? "Редактировать место" : "Добавить место"}</h2>

      <label>Название</label>
      <input value={title} onChange={e => setTitle(e.target.value)} />

      <label>Адрес</label>
      <input value={address} onChange={e => setAddress(e.target.value)} />

      <label>Область</label>
      <input value={region} onChange={e => setRegion(e.target.value)} />

      <label>Краткое описание</label>
      <input value={shortDesc} onChange={e => setShortDesc(e.target.value)} />

      <label>Описание</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} />

      <label>Теги (через запятую)</label>
      <input value={tags} onChange={e => setTags(e.target.value)} />

      <label>Фотографии (URL)</label>
      <div className="photo-add-row">
        <input
          value={photoUrl}
          onChange={e => setPhotoUrl(e.target.value)}
          placeholder="https://..../photo.jpg"
        />
        <button className="btn gold" onClick={addPhoto}>Добавить</button>
      </div>

      <div className="photo-preview-list">
        {photos.map(url => (
          <div className="photo-preview" key={url}>
            <img src={url} alt="preview" />
            <button className="delete-photo" onClick={() => removePhoto(url)}>×</button>
          </div>
        ))}
      </div>

      <div className="form-buttons">
        <button className="btn gold" onClick={savePlace}>Сохранить</button>
        <button className="btn gold" onClick={onCancel}>Отмена</button>

        {place?.id && (
          <button className="btn red" onClick={deletePlace}>
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}