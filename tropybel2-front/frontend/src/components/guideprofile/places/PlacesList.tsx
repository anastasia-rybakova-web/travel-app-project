import React, { useState, useEffect } from "react";
import { apiService } from "../../../services/api.service";
import { Place } from "../../../types/user.types";
import PlaceForm from "./PlaceForm";
import PlaceCard from "./PlaceCard";
import "./PlacesList.css";

interface User {
  id: number;
}

interface PlacesListProps {
  user: User;
}

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

export default function PlacesList({ user }: PlacesListProps): React.JSX.Element {
  const [places, setPlaces] = useState<Place[]>([]);
  const [editing, setEditing] = useState<PlaceFormData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadPlaces = async () => {
    try {
      const data = await apiService.getPlacesByGuide(user.id);
      setPlaces(data);
    } catch (error) {
      console.error("Ошибка загрузки мест:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlaces();
  }, [user.id]);

  const convertToFormData = (place: Place): PlaceFormData => {
    return {
      id: place.id,
      title: place.title,
      address: place.address,
      region: place.region,
      shortDescription: place.shortDescription,
      description: place.description,
      tags: place.tags,
      photos: place.photos,
      rating: place.rating,
    };
  };

  const handleSave = async (placeData: PlaceFormData): Promise<void> => {
    if (placeData.id) {
      await apiService.updatePlace(placeData.id, placeData);
    } else {
      await apiService.createPlace({ ...placeData, guideUserId: user.id });
    }
    setEditing(null);
    loadPlaces();
  };

  const handleEdit = (place: Place): void => {
    setEditing(convertToFormData(place));
  };

  const handleDelete = (id: number): void => {
    setPlaces(prev => prev.filter(p => p.id !== id));
    setEditing(null);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <section className="places-section">
      <div className="container">
        <div className="places-header">
          <h2>
            Мои места
            <span className="places-divider">
              <span className="line">――――</span>
              <span className="dots">•••</span>
              <span className="line">――――</span>
            </span>
          </h2>
          <p>
            Управляйте вашими местами — добавляйте новые, редактируйте существующие и создавайте уникальные маршруты для туристов.
          </p>
        </div>

        <div className="places-actions">
          <button className="btn gold" onClick={() => setEditing({
            id: undefined,
            title: "",
            address: "",
            region: "",
            shortDescription: "",
            description: "",
            tags: [],
            photos: [],
            rating: 0,
          })}>
            Добавить место
          </button>
        </div>

        {editing && (
          <PlaceForm 
            place={editing.id ? editing : undefined} 
            onSave={handleSave}
            onCancel={() => setEditing(null)} 
            onDelete={handleDelete}
          />
        )}

        <div className="places-grid">
          {places.map(place => (
            <PlaceCard key={place.id} place={place} onEdit={handleEdit} />
          ))}
        </div>
      </div>
    </section>
  );
}