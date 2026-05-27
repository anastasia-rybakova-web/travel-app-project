import React, { useState, useEffect } from "react";
import { apiService } from "../../services/api.service";
import { User, TouristProfile } from "../../types/user.types";
import "./TouristProfileEditor.css";

interface TouristProfileEditorProps {
  user: User;
}

export default function TouristProfileEditor({ user }: TouristProfileEditorProps): React.JSX.Element {
  const [form, setForm] = useState<TouristProfile>({
    userId: user.id,
    name: user.username,
    photo: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiService.getTouristProfile(user.id);
        setForm(data);
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const removePhoto = (): void => {
    setForm({ ...form, photo: "" });
  };

  const save = async (): Promise<void> => {
    try {
      await apiService.updateTouristProfile(user.id, form);
      alert("Профиль сохранен");
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      alert("Ошибка сохранения профиля");
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="tourist-profile-editor">
      <h2>Профиль туриста</h2>

      <label>Имя</label>
      <input 
        name="name" 
        value={form.name} 
        onChange={handleChange} 
      />

      <label>Фото профиля (URL)</label>
      <input
        name="photo"
        value={form.photo || ""}
        onChange={handleChange}
        placeholder="Вставьте url фото"
      />

      {form.photo && (
        <div className="tourist-profile-photo-preview">
          <img src={form.photo} alt="profile preview" />
          <button 
            className="tourist-profile-delete-photo" 
            onClick={removePhoto}
            title="Удалить фото"
            aria-label="Удалить фото"
          >
            
          </button>
        </div>
      )}

      <button className="tourist-profile-save-btn" onClick={save}>
        Сохранить
      </button>
    </div>
  );
}