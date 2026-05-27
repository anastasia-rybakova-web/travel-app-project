export type UserRole = 'guide' | 'tourist';

export interface User {
  id: number;
  username: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterData {
  username: string;
  password: string;
  role: UserRole;
  phone?: string;
  email?: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface GuideProfile {
  userId: number;
  name: string;
  about: string;
  phone: string;
  email: string;
  photo: string;
  rating: number;
  routesCount?: number;
}

export interface TouristProfile {
  userId: number;
  name: string;
  photo: string;
}

export interface Route {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  duration: string;
  people: string;
  price: string;
  type: string;
  photos: string[];
  rating: number;
  guideUserId: number;
  guide?: GuideProfile;
  routeDates?: RouteDate[];
  routePlaces?: RoutePlace[];
  dates?: string[]; 
}

export interface RouteDate {
  id: number;
  routeId: number;
  date: string;
}

export interface RoutePlace {
  routeId: number;
  placeId: number;
  place?: Place;
}

export interface Place {
  id: number;
  title: string;
  address: string;
  region: string;
  shortDescription: string;
  description: string;
  tags: string[];
  photos: string[];
  rating: number;
  guideUserId: number;
  guide?: GuideProfile;
}

export interface Booking {
  id: number;
  routeId: number;
  guideUserId: number;
  touristUserId: number;
  date: string;
  people: number;
  fio: string;
  phone: string;
  email: string;
  note: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'rejected' | 'done' | 'cancel_requested';
  createdAt: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  route?: Route;
  guide?: GuideProfile;
  tourist?: TouristProfile;
  cancelRequest?: {          
    id: number;
    bookingId: number;
    date: string;
    reason: string;
    requestedBy: string;
    isRejection: boolean;
  };
}

export interface Review {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  username: string;
  photo?: string;
}

export interface PlaceReview extends Review {
  placeId: number;
  userId: number;
}

export interface RouteReview extends Review {
  routeId: number;
  userId: number;
}

export interface GuideReview extends Review {
  guideUserId: number;
  userId: number;
}

export interface ValidationErrors {
  username?: string;
  password?: string;
  repeat?: string;
  phone?: string;
  email?: string;
  role?: string;
}