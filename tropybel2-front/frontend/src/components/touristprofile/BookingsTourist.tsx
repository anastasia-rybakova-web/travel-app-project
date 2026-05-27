import React, { useState, useEffect } from "react";
import { apiService } from "../../services/api.service";
import { User, Booking, Route, GuideProfile } from "../../types/user.types";
import "./BookingsTourist.css";

interface BookingsTouristProps {
  user: User;
}

function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    "pending": "На рассмотрении",
    "confirmed": "Подтвержден",
    "rejected": "Отклонен",
    "cancelled": "Отменен",
    "cancel_requested": "В процессе отмены",
    "done": "Завершен"
  };
  return statusMap[status] || status;
}

export default function BookingsTourist({ user }: BookingsTouristProps): React.JSX.Element {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [guides, setGuides] = useState<GuideProfile[]>([]);
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [showContactsForGuide, setShowContactsForGuide] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    try {
      const [bookingsData, guidesData] = await Promise.all([
        apiService.getBookingsByTourist(user.id),
        apiService.getAllGuides()
      ]);
      setBookings(bookingsData);
      setGuides(guidesData);
      
      const uniqueRouteIds = [...new Set(bookingsData.map(b => b.routeId))];
      const routesData = await Promise.all(
        uniqueRouteIds.map(id => apiService.getRouteById(id))
      );
      setRoutes(routesData);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user.id]);

  const getRoute = (id: number): Route | undefined => routes.find(r => r.id === id);
  const getGuide = (guideUserId: number): GuideProfile | undefined => guides.find(g => g.userId === guideUserId);

  const requestCancel = async (bookingId: number, reason: string = "Турист запросил отмену"): Promise<void> => {
    await apiService.requestCancelBooking(bookingId, reason, "tourist");
    loadData();
  };

  const filteredBookings = bookings.filter(b => {
    if (activeTab === "pending") return b.status === "pending";
    if (activeTab === "confirmed") return b.status === "confirmed";
    if (activeTab === "cancelling") return b.status === "cancel_requested";
    if (activeTab === "rejected") return b.status === "rejected";
    if (activeTab === "cancelled") return b.status === "cancelled";
    if (activeTab === "done") return b.status === "done";
    return false;
  });

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="tourist-bookings">
      <h2>Мои заявки</h2>

      <div className="tourist-booking-tabs">
        <button onClick={() => setActiveTab("pending")} className={activeTab === "pending" ? "active" : ""}>
          На рассмотрении ({bookings.filter(b => b.status === "pending").length})
        </button>
        <button onClick={() => setActiveTab("confirmed")} className={activeTab === "confirmed" ? "active" : ""}>
          Подтвержденные ({bookings.filter(b => b.status === "confirmed").length})
        </button>
        <button onClick={() => setActiveTab("cancelling")} className={activeTab === "cancelling" ? "active" : ""}>
          В процессе отмены ({bookings.filter(b => b.status === "cancel_requested").length})
        </button>
        <button onClick={() => setActiveTab("done")} className={activeTab === "done" ? "active" : ""}>
          Завершенные ({bookings.filter(b => b.status === "done").length})
        </button>
        <button onClick={() => setActiveTab("rejected")} className={activeTab === "rejected" ? "active" : ""}>
          Отклоненные ({bookings.filter(b => b.status === "rejected").length})
        </button>
        <button onClick={() => setActiveTab("cancelled")} className={activeTab === "cancelled" ? "active" : ""}>
          Отмененные ({bookings.filter(b => b.status === "cancelled").length})
        </button>
      </div>

      {filteredBookings.length === 0 ? (
        <p className="no-bookings">Нет заявок в этой категории</p>
      ) : (
        filteredBookings.map(b => {
          const route = getRoute(b.routeId);
          const guide = getGuide(b.guideUserId);
          if (!route) return null;

          return (
            <div key={b.id} className="booking-card">
              <div className="booking-header">
                <h3>{route.title}</h3>
                <span className={`status-badge status-${b.status}`}>
                  {getStatusText(b.status)}
                </span>
              </div>
              
              <div className="booking-details">
                <p><b>Дата:</b> {b.date}</p>
                <p><b>Количество человек:</b> {b.people}</p>
                <p><b>Цена:</b> {route.price} руб/чел</p>
                <p><b>Общая стоимость:</b> {Number(route.price) * b.people} руб</p>
                <p><b>Гид:</b> {guide?.name || "Неизвестен"}</p>
              </div>

              <div className="booking-actions">
                {(b.status === "pending" || b.status === "confirmed") && (
                  <>
                    <button onClick={() => requestCancel(b.id)} className="tourist-bookings-cancel-btn">
                      Отменить {b.status === "pending" ? "заявку" : "бронирование"}
                    </button>
                    <button 
                      className="tourist-bookings-contact-btn"
                      onClick={() => {
                        if (guide) {
                          setShowContactsForGuide(showContactsForGuide === b.guideUserId ? null : b.guideUserId);
                        } else {
                          alert("Информация о гиде не найдена");
                        }
                      }}
                    >
                      Связаться с гидом
                    </button>
                  </>
                )}

                {b.status === "cancel_requested" && (
                  <div className="cancelling-info">
                    <p>Запрос на отмену отправлен гиду</p>
                    {b.cancelRequest?.date && (
                      <p><i>Отправлено: {new Date(b.cancelRequest.date).toLocaleDateString()}</i></p>
                    )}
                    {b.cancelRequest?.reason && (
                      <p><i>Причина: {b.cancelRequest.reason}</i></p>
                    )}
                    <button 
                      className="tourist-bookings-contact-btn"
                      onClick={() => {
                        if (guide) {
                          setShowContactsForGuide(showContactsForGuide === b.guideUserId ? null : b.guideUserId);
                        }
                      }}
                    >
                      Уточнить у гида
                    </button>
                  </div>
                )}

                {b.status === "done" && (
                  <div className="completed-info">
                    <p>✔ Тур завершен</p>
                  </div>
                )}

                {b.status === "rejected" && (
                  <div className="rejected-info">
                    <p>✗ Гид отклонил вашу заявку</p>
                    <button 
                      className="tourist-bookings-contact-btn"
                      onClick={() => {
                        if (guide) {
                          setShowContactsForGuide(showContactsForGuide === b.guideUserId ? null : b.guideUserId);
                        }
                      }}
                    >
                      Уточнить причину
                    </button>
                  </div>
                )}
              </div>

              {showContactsForGuide === b.guideUserId && guide && (
                <div className="guide-contacts-popup">
                  <h4>Контакты гида {guide.name}:</h4>
                  <p><strong>Телефон:</strong> {guide.phone || "не указан"}</p>
                  <p><strong>Email:</strong> {guide.email || "не указан"}</p>
                  <button 
                    className="close-contacts-btn"
                    onClick={() => setShowContactsForGuide(null)}
                  >
                    Скрыть контакты
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}