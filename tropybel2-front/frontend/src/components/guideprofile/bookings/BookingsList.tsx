import React, { useState, useEffect } from "react";
import { apiService } from "../../../services/api.service";
import { Booking, Route } from "../../../types/user.types";
import "./BookingsList.css";

interface User {
  id: number;
}

interface BookingsListProps {
  user: User;
}

function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    "pending": "На рассмотрении",
    "confirmed": "Подтвержден",
    "rejected": "Отклонен",
    "cancelled": "Отменен",
    "cancel_requested": "Запрос на отмену",
    "done": "Завершен"
  };
  return statusMap[status] || status;
}

export default function BookingsList({ user }: BookingsListProps): React.JSX.Element {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showTouristContacts, setShowTouristContacts] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    try {
      const [bookingsData, routesData] = await Promise.all([
        apiService.getBookingsByGuide(user.id),
        apiService.getRoutes()
      ]);
      setBookings(bookingsData);
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

  const toggleTouristContacts = (bookingId: number): void => {
    setShowTouristContacts(showTouristContacts === bookingId ? null : bookingId);
  };

  const confirmBooking = async (id: number): Promise<void> => {
    await apiService.updateBookingStatus(id, "confirmed");
    loadData();
  };

  const rejectBooking = async (id: number): Promise<void> => {
    await apiService.requestCancelBooking(id, "Заявка отклонена гидом", "guide");
    loadData();
  };

  const requestCancelAsGuide = async (id: number, reason: string = "По инициативе гида"): Promise<void> => {
    await apiService.requestCancelBooking(id, reason, "guide");
    loadData();
  };

  const confirmCancelRequest = async (id: number, finalStatus: string): Promise<void> => {
    await apiService.updateBookingStatus(id, finalStatus);
    loadData();
  };

  const rejectCancelRequest = async (id: number): Promise<void> => {
    await apiService.rejectCancelRequest(id);
    loadData();
  };

  const completeBooking = async (id: number): Promise<void> => {
    await apiService.completeBooking(id);
    loadData();
  };

  const getRouteInfo = (routeId: number): Route | undefined => routes.find(r => r.id === routeId);

  const filteredBookings = bookings.filter(b => {
    if (activeTab === "all") return true;
    return b.status === activeTab;
  });

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="bookings-list">
      <h2>Бронирования моих маршрутов</h2>

      <div className="bookings-tabs">
        <button onClick={() => setActiveTab("all")} className={activeTab === "all" ? "active" : ""}>
          Все ({bookings.length})
        </button>
        <button onClick={() => setActiveTab("pending")} className={activeTab === "pending" ? "active" : ""}>
          Новые ({bookings.filter(b => b.status === "pending").length})
        </button>
        <button onClick={() => setActiveTab("confirmed")} className={activeTab === "confirmed" ? "active" : ""}>
          Подтвержденные ({bookings.filter(b => b.status === "confirmed").length})
        </button>
        <button onClick={() => setActiveTab("cancel_requested")} className={activeTab === "cancel_requested" ? "active" : ""}>
          Заявки на отмену ({bookings.filter(b => b.status === "cancel_requested").length})
        </button>
        <button onClick={() => setActiveTab("done")} className={activeTab === "done" ? "active" : ""}>
          Завершенные ({bookings.filter(b => b.status === "done").length})
        </button>
        <button onClick={() => setActiveTab("cancelled")} className={activeTab === "cancelled" ? "active" : ""}>
          Отмененные ({bookings.filter(b => b.status === "cancelled").length})
        </button>
        <button onClick={() => setActiveTab("rejected")} className={activeTab === "rejected" ? "active" : ""}>
          Отклоненные ({bookings.filter(b => b.status === "rejected").length})
        </button>
      </div>

      {filteredBookings.length === 0 ? (
        <p className="no-bookings">Нет бронирований в этой категории</p>
      ) : (
        filteredBookings.map(b => {
          const route = getRouteInfo(b.routeId);
          const isPastTour = new Date(b.date) < new Date();

          return (
            <div key={b.id} className="booking-item">
              <h3>{route?.title || `Маршрут #${b.routeId}`}</h3>
              <p><b>Дата:</b> {b.date} {isPastTour && " (прошедшая)"}</p>
              <p><b>Турист:</b> {b.fio}</p>
              <p><b>Количество:</b> {b.people} чел.</p>
              <p><b>Статус:</b> <span className={`status-${b.status}`}>{getStatusText(b.status)}</span></p>

              <div className="tourist-contacts-section">
                <div className="contacts-header">
                  <b>Контакты туриста:</b>
                  <button 
                    onClick={() => toggleTouristContacts(b.id)}
                    className="tourist-contacts-toggle-btn"
                  >
                    {showTouristContacts === b.id ? "Скрыть контакты" : "Показать контакты"}
                  </button>
                </div>
                
                {showTouristContacts === b.id && (
                  <div className="tourist-contacts-details">
                    <p><strong>Телефон:</strong> {b.phone}</p>
                    <p><strong>Email:</strong> {b.email}</p>
                  </div>
                )}
              </div>

              {b.note && <p><b>Примечание:</b> {b.note}</p>}

              <div className="guide-bookings-booking-actions">
                {b.status === "pending" && (
                  <>
                    <button onClick={() => confirmBooking(b.id)} className="accept-btn">
                      ✓ Подтвердить
                    </button>
                    <button onClick={() => rejectBooking(b.id)} className="reject-btn">
                      ✕ Отклонить
                    </button>
                  </>
                )}

                {b.status === "confirmed" && (
                  <>
                    <button 
                      onClick={() => requestCancelAsGuide(b.id)}
                      className="guide-bookings-cancel-btn"
                    >
                      Отменить бронирование
                    </button>
                    {isPastTour && (
                      <button 
                        onClick={() => completeBooking(b.id)}
                        className="guide-bookings-complete-btn"
                      >
                        Завершить тур
                      </button>
                    )}
                    <button 
                      onClick={() => toggleTouristContacts(b.id)}
                      className="guide-bookings-contact-btn"
                    >
                      {showTouristContacts === b.id ? "Скрыть контакты" : "Связаться с туристом"}
                    </button>
                  </>
                )}

                {b.status === "cancel_requested" && (
                  <div className="cancel-request-box">
                    <p className="cancel-notice">
                      {b.cancelRequest?.requestedBy === "guide" 
                        ? (b.cancelRequest?.isRejection ? "Вы запросили отклонение заявки" : "Вы запросили отмену")
                        : "Турист запросил отмену"}
                      {b.cancelRequest?.reason && ` (${b.cancelRequest.reason})`}
                    </p>
                    <div className="cancel-actions">
                      {b.cancelRequest?.isRejection ? (
                        <>
                          <button 
                            onClick={() => confirmCancelRequest(b.id, "rejected")} 
                            className="confirm-cancel-btn"
                          >
                            Подтвердить отклонение
                          </button>
                          <button 
                            onClick={() => rejectCancelRequest(b.id)} 
                            className="reject-cancel-btn"
                          >
                            Отменить отклонение
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => confirmCancelRequest(b.id, "cancelled")} 
                            className="confirm-cancel-btn"
                          >
                            Подтвердить отмену
                          </button>
                          <button 
                            onClick={() => rejectCancelRequest(b.id)} 
                            className="reject-cancel-btn"
                          >
                            Отклонить запрос на отмену
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {b.status === "done" && (
                  <div className="completed-info">
                    <p>✔ Тур завершен {b.completedAt && new Date(b.completedAt).toLocaleDateString()}</p>
                  </div>
                )}

                {(b.status === "cancelled" || b.status === "rejected") && (
                  <div className="cancelled-info">
                    <p>
                      {b.status === "rejected" ? "✗ Заявка отклонена" : "✗ Бронирование отменено"}
                      {b.cancelledAt && ` ${new Date(b.cancelledAt).toLocaleDateString()}`}
                    </p>
                    {b.cancelRequest?.reason && <p><i>Причина: {b.cancelRequest.reason}</i></p>}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}