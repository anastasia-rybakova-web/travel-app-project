import React, { useState, useEffect } from "react";
import { apiService } from "../../services/api.service";
import "./GuideProfileEditor.css";

interface User {
  id: number;
  username: string;
  role: string;
}

interface GuideProfile {
  userId: number;
  name: string;
  about: string;
  phone: string;
  email: string;
  photo: string;
  rating: number;
}

interface GuideProfileEditorProps {
  user: User;
}

export default function GuideProfileEditor({ user }: GuideProfileEditorProps): React.JSX.Element {
  const [form, setForm] = useState<GuideProfile>({
    userId: user.id,
    name: user.username,
    about: "",
    phone: "",
    email: "",
    photo: "",
    rating: 0
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiService.getGuideProfile(user.id);
        setForm(data);
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const removePhoto = (): void => {
    setForm({ ...form, photo: "" });
  };

  const save = async (): Promise<void> => {
    try {
      await apiService.updateGuideProfile(user.id, form);
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
    <div className="guide-profile-editor">
      <h2>Публичный профиль</h2>

      <label>Имя для профиля</label>
      <input name="name" value={form.name} onChange={handleChange} />

      <label>О себе</label>
      <textarea name="about" value={form.about} onChange={handleChange} />

      <label>Контактный телефон</label>
      <input 
        name="phone" 
        value={form.phone} 
        onChange={handleChange}
        placeholder="+375291234567"
      />

      <label>Email</label>
      <input 
        name="email" 
        type="email"
        value={form.email} 
        onChange={handleChange}
        placeholder="guide@mail.com"
      />

      <label>Фото профиля (URL)</label>
      <input
        name="photo"
        value={form.photo}
        onChange={handleChange}
        placeholder="https://..../profile.jpg"
      />

      {form.photo && (
        <div className="photo-preview">
          <img src={form.photo} alt="profile preview" />
          <button className="delete-photo" onClick={removePhoto}>✖</button>
        </div>
      )}

      <button className="save" onClick={save}>Сохранить профиль</button>
    </div>
  );
}