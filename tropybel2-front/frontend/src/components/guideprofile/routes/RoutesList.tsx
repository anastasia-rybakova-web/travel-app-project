import React, { useState, useEffect } from "react";
import { apiService } from "../../../services/api.service";
import { Route } from "../../../types/user.types";
import RouteForm from "./RouteForm";
import RouteCard from "./RouteCard";
import "./RoutesList.css";

interface User {
  id: number;
}

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

interface RoutesListProps {
  user: User;
}

export default function RoutesList({ user }: RoutesListProps): React.JSX.Element {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [placesAll, setPlacesAll] = useState<Place[]>([]);
  const [editing, setEditing] = useState<RouteFormData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadRoutes = async () => {
    try {
      const data = await apiService.getRoutesByGuide(user.id);
      setRoutes(data);
    } catch (error) {
      console.error("Ошибка загрузки маршрутов:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoutes();
    const fetchPlaces = async () => {
      try {
        const data = await apiService.getPlaces();
        setPlacesAll(data);
      } catch (error) {
        console.error("Ошибка загрузки мест:", error);
      }
    };
    fetchPlaces();
  }, [user.id]);

  const convertToFormData = (route: Route): RouteFormData => {
    return {
      id: route.id,
      title: route.title,
      shortDescription: route.shortDescription,
      description: route.description,
      duration: route.duration,
      people: route.people,
      price: route.price,
      type: route.type,
      photos: route.photos,
      rating: route.rating,
      places: route.routePlaces?.map(rp => rp.placeId) || [],
      dates: route.routeDates?.map(rd => rd.date) || [],
    };
  };

  const handleSave = async (routeData: RouteFormData): Promise<void> => {
    if (routeData.id) {
      await apiService.updateRoute(routeData.id, routeData);
    } else {
      await apiService.createRoute({ ...routeData, guideUserId: user.id });
    }
    setEditing(null);
    loadRoutes();
  };

  const handleEdit = (route: Route): void => {
    setEditing(convertToFormData(route));
  };

  const handleDeleteRoute = (id: number): void => {
    setRoutes(prev => prev.filter(r => r.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <section className="routes-section">
      <div className="container">
        <div className="routes-header">
          <h2>Мои маршруты</h2>
        </div>

        <div className="routes-actions">
          <button className="btn gold" onClick={() => setEditing({
            id: undefined,
            title: "",
            shortDescription: "",
            description: "",
            duration: "",
            people: "",
            price: "",
            type: "",
            photos: [],
            rating: 0,
            places: [],
            dates: [],
          })}>
            Создать маршрут
          </button>
        </div>

        {editing && (
          <RouteForm
            route={editing}
            places={placesAll}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
            onDelete={handleDeleteRoute}
          />
        )}

        <div className="routes-grid">
          {routes.map(route => (
            <RouteCard key={route.id} route={route} onEdit={handleEdit} />
          ))}
        </div>
      </div>
    </section>
  );
}