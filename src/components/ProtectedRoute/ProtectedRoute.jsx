import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Routes
import { routes } from '../../utils/';

// Redux
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={routes.login.path} replace />;
};

export default ProtectedRoute;
