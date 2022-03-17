import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Routes
import { routes } from '../../utils/';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = true;

  // $
  console.log(`Is logged in: ${isLoggedIn}`);

  return isLoggedIn ? <Outlet /> : <Navigate to={routes.login.path} replace />;
};

export default ProtectedRoute;
