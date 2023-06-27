import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate, RouterProvider, useNavigate, useNavigation } from 'react-router-dom';
import CouponList from './Components/CouponArea/CouponList/CouponList';
import { Login } from './Components/AuthArea/Login/Login';
import { AdminComponent } from './Components/PagesArea/AdminComponent';
import { CompanyComponent } from './Components/PagesArea/CompanyComponent';
import { router } from './Components/RoutingArea/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);































root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />

  //  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
