import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function PrivateRoute({ element, roles }) {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="/error/401" />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded?.roleId;

    if (!roles.includes(userRole)) {
      return <Navigate to="/error/403" />;
    }

    return element;
  } catch (error) {
    return <Navigate to="/error/401" />;
  }
}

export default PrivateRoute;
