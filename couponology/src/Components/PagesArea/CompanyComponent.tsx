import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useMyStore } from '../../Zustand/Store';



export function CompanyComponent() {
  const store = useMyStore();
  if (store.connectedClientType !== "COMPANY") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
