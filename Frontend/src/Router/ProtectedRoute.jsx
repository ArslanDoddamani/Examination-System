import React from 'react'
import { isLoggedIn } from '../auth/loggedIn'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute