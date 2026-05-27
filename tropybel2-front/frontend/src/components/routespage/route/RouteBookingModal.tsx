import React, { useState, useEffect } from "react";
import { apiService } from "../../../services/api.service";
import { Route, User } from "../../../types/user.types";
import "./RouteBookingModal.css";

interface RouteBookingModalProps {
  route: Route;
  user: User | null;
  onClose: () => void;
}

export default function RouteBookingModal({ route, user, onClose }: RouteBookingModalProps): React.JSX.Element {
  const [date, setDate] = useState<string>("");
  const [people, setPeople] = useState<number>(1);
  const [available, setAvailable] = useState<number | null>(null);
  const [fio, setFio] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const upcomingDates: string[] = route.dates
    ?.filter(d => new Date(d) >= new Date())
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()) || [];

  console.log("Доступные даты:", upcomingDates); 

  useEffect(() => {
    if (!date) return;

    const checkAvailability = async () => {
      try {
        const bookings = await apiService.getBookingsByRoute(route.id, date);
        const booked = bookings.reduce((sum: number, b: any) => sum + Number(b.people), 0);
        const total = Number(route.people);
        setAvailable(total - booked);
      } catch (error) {
        console.error("Ошибка проверки доступности:", error);
      }
    };
    checkAvailability();
  }, [date, route.id, route.people]);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError("Введите корректный email адрес");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (available !== null && people > available) {
      setMessage(`Доступно только ${available} мест.`);
      return;
    }
    
    if (email && !validateEmail(email)) {
      setEmailError("Введите корректный email адрес");
      return;
    }

    setIsSubmitting(true);

    try {
      await apiService.createBooking({
        routeId: route.id,
        guideUserId: route.guideUserId,
        touristUserId: user?.id,
        date,
        people,
        fio,
        phone,
        email,
        note,
      });
      setSubmitted(true);
      setMessage("");
    } catch (error) {
      console.error("Ошибка при бронировании:", error);
      setMessage("Произошла ошибка при бронировании");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="route-booking-modal">
      <div className="route-booking-modal-content">
        <button className="route-booking-modal-close" onClick={onClose}>×</button>

        {submitted ? (
          <div className="confirmation-screen">
            <h2>✓ Заявка отправлена!</h2>
            <p>Ваша заявка успешно отправлена гиду.</p>
            <p>Гид рассмотрит её в ближайшее время.</p>
            <p>Статус заявки можно отслеживать в личном кабинете.</p>
            
            <div className="booking-summary">
              <h3>Детали заявки:</h3>
              <p><b>Маршрут:</b> {route.title}</p>
              <p><b>Дата:</b> {date}</p>
              <p><b>Количество человек:</b> {people}</p>
              <p><b>ФИО:</b> {fio}</p>
            </div>
            
            <div className="confirmation-actions">
              <button 
                className="route-booking-gold-btn"
                onClick={() => window.location.href = "/profile/tourist"}
              >
                Перейти в личный кабинет
              </button>
              <button 
                className="route-booking-secondary-btn"
                onClick={onClose}
              >
                Закрыть
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2>Бронирование маршрута</h2>

            {upcomingDates.length === 0 ? (
              <p className="no-dates">На данный момент бронирование недоступно.</p>
            ) : (
              <form onSubmit={handleSubmit} className="route-booking-form">
                <label>Дата:</label>
                <select value={date} onChange={e => setDate(e.target.value)} required>
                  <option value="">Выберите дату</option>
                  {upcomingDates.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                {available !== null && (
                  <p className="available">Свободных мест: {available}</p>
                )}

                <label>Количество человек:</label>
                <input
                  type="number"
                  min="1"
                  max={available ?? Number(route.people)}
                  value={people}
                  onChange={e => setPeople(Number(e.target.value))}
                  required
                />

                <label>ФИО:</label>
                <input value={fio} onChange={e => setFio(e.target.value)} required />

                <label>Телефон:</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} required />

                <label>Email:</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={handleEmailChange}
                  required
                  className={emailError ? "email-input-error" : ""}
                />
                {emailError && <p className="email-error-message">{emailError}</p>}

                <label>Примечание:</label>
                <textarea 
                  value={note} 
                  onChange={e => setNote(e.target.value)}
                  placeholder="Особые пожелания и т.д."
                />

                <button className="route-booking-gold-btn" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Отправка..." : "Забронировать"}
                </button>

                {message && <p className="route-booking-error-message">{message}</p>}
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}