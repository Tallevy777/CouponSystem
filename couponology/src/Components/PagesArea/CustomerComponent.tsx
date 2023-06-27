import { Navigate, Outlet } from "react-router-dom";
import { useMyStore } from "../../Zustand/Store";

export function CustomerComponent() {
    const store = useMyStore();
    if (store.connectedClientType !== "CUSTOMER") {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  }
  