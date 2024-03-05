import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router';
import useAuth from '../util/useAuth'

const PrivateRoute = () => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/home" replace />;
};

export default PrivateRoute;
