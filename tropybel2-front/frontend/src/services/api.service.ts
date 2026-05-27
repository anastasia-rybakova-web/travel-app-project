import axios, { AxiosInstance, AxiosError } from 'axios';
import { AuthResponse, LoginData, RegisterData } from '../types/user.types';

const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/register', data);
    return response.data;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', data);
    return response.data;
  }

  async getProfile(): Promise<any> {
    const response = await this.api.get('/auth/profile');
    return response.data;
  }

  async getAllGuides(): Promise<any[]> {
    const response = await this.api.get('/guides');
    return response.data;
  }

  async getGuideById(userId: number): Promise<any> {
    const response = await this.api.get(`/guides/${userId}`);
    return response.data;
  }

  async getGuideProfile(userId: number): Promise<any> {
    const response = await this.api.get(`/guides/profile/${userId}`);
    return response.data;
  }

  async updateGuideProfile(userId: number, data: any): Promise<any> {
    const response = await this.api.put(`/guides/profile/${userId}`, data);
    return response.data;
  }

  async getTouristProfile(userId: number): Promise<any> {
    const response = await this.api.get(`/tourists/profile/${userId}`);
    return response.data;
  }

  async updateTouristProfile(userId: number, data: any): Promise<any> {
    const response = await this.api.put(`/tourists/profile/${userId}`, data);
    return response.data;
  }

  async getPlaces(): Promise<any[]> {
    const response = await this.api.get('/places');
    return response.data;
  }

  async getPlaceById(id: number): Promise<any> {
    const response = await this.api.get(`/places/${id}`);
    return response.data;
  }

  async getBestPlaces(limit: number = 8): Promise<any[]> {
    const response = await this.api.get('/places/best', { params: { limit } });
    return response.data;
  }

  async getPlacesByRegion(region: string): Promise<any[]> {
    const response = await this.api.get(`/places/region/${region}`);
    return response.data;
  }

  async getPlacesByGuide(guideUserId: number): Promise<any[]> {
    const response = await this.api.get(`/places/guide/${guideUserId}`);
    return response.data;
  }

  async createPlace(data: any): Promise<any> {
    const response = await this.api.post('/places', data);
    return response.data;
  }

  async updatePlace(id: number, data: any): Promise<any> {
    const response = await this.api.put(`/places/${id}`, data);
    return response.data;
  }

  async deletePlace(id: number): Promise<void> {
    await this.api.delete(`/places/${id}`);
  }

  async getRoutes(): Promise<any[]> {
    const response = await this.api.get('/routes');
    return response.data;
  }

  async getRouteById(id: number): Promise<any> {
    const response = await this.api.get(`/routes/${id}`);
    return response.data;
  }

  async getPopularRoutes(limit: number = 6): Promise<any[]> {
    const response = await this.api.get('/routes/popular', { params: { limit } });
    return response.data;
  }

  async getRoutesByGuide(guideUserId: number): Promise<any[]> {
    const response = await this.api.get(`/routes/guide/${guideUserId}`);
    return response.data;
  }

  async createRoute(data: any): Promise<any> {
    const response = await this.api.post('/routes', data);
    return response.data;
  }

  async updateRoute(id: number, data: any): Promise<any> {
    const response = await this.api.put(`/routes/${id}`, data);
    return response.data;
  }

  async deleteRoute(id: number): Promise<void> {
    await this.api.delete(`/routes/${id}`);
  }

async getRouteWithAllData(id: number): Promise<any> {
  const response = await this.api.get(`/routes/${id}/full`);
  return response.data;
}

  async getBookingsByGuide(guideUserId: number): Promise<any[]> {
    const response = await this.api.get(`/bookings/guide/${guideUserId}`);
    return response.data;
  }

  async getBookingsByTourist(touristUserId: number): Promise<any[]> {
    const response = await this.api.get(`/bookings/tourist/${touristUserId}`);
    return response.data;
  }

  async updateBookingStatus(id: number, status: string): Promise<any> {
    const response = await this.api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  }

  async requestCancelBooking(id: number, reason: string, requestedBy: string): Promise<any> {
    const response = await this.api.post(`/bookings/${id}/cancel-request`, { reason, requestedBy });
    return response.data;
  }

  async rejectCancelRequest(id: number): Promise<any> {
    const response = await this.api.post(`/bookings/${id}/reject-cancel`);
    return response.data;
  }

  async completeBooking(id: number): Promise<any> {
    const response = await this.api.patch(`/bookings/${id}/complete`);
    return response.data;
  }

  async createBooking(data: any): Promise<any> {
    const response = await this.api.post('/bookings', data);
    return response.data;
  }

  async getBookingsByRoute(routeId: number, date: string): Promise<any[]> {
    const response = await this.api.get(`/bookings/route/${routeId}`, { params: { date } });
    return response.data;
  }

  

  async getPlaceReviews(placeId: number): Promise<any[]> {
    const response = await this.api.get(`/places/${placeId}/reviews`);
    return response.data;
  }

  async addPlaceReview(placeId: number, data: any): Promise<any> {
    const response = await this.api.post(`/places/${placeId}/reviews`, data);
    return response.data;
  }

  async updatePlaceReview(reviewId: number, data: any): Promise<any> {
    const response = await this.api.put(`/places/reviews/${reviewId}`, data);
    return response.data;
  }

  async deletePlaceReview(reviewId: number): Promise<void> {
    await this.api.delete(`/places/reviews/${reviewId}`);
  }


  async getRouteReviews(routeId: number): Promise<any[]> {
    const response = await this.api.get(`/routes/${routeId}/reviews`);
    return response.data;
  }

async addRouteReview(routeId: number, data: any): Promise<any> {
  const response = await this.api.post(`/reviews/routes/${routeId}`, data);
  return response.data;
}

  async updateRouteReview(reviewId: number, data: any): Promise<any> {
    const response = await this.api.put(`/routes/reviews/${reviewId}`, data);
    return response.data;
  }

  async deleteRouteReview(reviewId: number): Promise<void> {
    await this.api.delete(`/routes/reviews/${reviewId}`);
  }


async getGuideReviews(guideUserId: number): Promise<any[]> {
  const response = await this.api.get(`/reviews/guides/${guideUserId}`);
  return response.data;
}

async addGuideReview(guideUserId: number, data: any): Promise<any> {
  const response = await this.api.post(`/reviews/guides/${guideUserId}`, data);
  return response.data;
}

async updateGuideReview(reviewId: number, data: any): Promise<any> {
  const response = await this.api.put(`/reviews/guides/${reviewId}`, data);
  return response.data;
}

async deleteGuideReview(reviewId: number): Promise<void> {
  await this.api.delete(`/reviews/guides/${reviewId}`);
}

  async searchRoutes(params: any): Promise<any[]> {
    const response = await this.api.get('/routes/search', { params });
    return response.data;
  }

  async searchPlaces(params: any): Promise<any[]> {
    const response = await this.api.get('/places/search', { params });
    return response.data;
  }
}

export const apiService = new ApiService();