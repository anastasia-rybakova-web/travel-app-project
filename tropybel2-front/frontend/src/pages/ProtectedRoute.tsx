import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserRole } from '../types/user.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: UserRole;
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps): React.JSX.Element {
  const userStr = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  
  if (!userStr || !token) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userStr);
  
  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}