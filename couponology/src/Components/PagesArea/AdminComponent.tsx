import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useMyStore } from '../../Zustand/Store';


export function AdminComponent() {
  const store = useMyStore();
  if(store.connectedClientType !=="ADMINISTRATOR"){
  return <Navigate to="/login" replace/>
  } 
  return <Outlet />;
}



