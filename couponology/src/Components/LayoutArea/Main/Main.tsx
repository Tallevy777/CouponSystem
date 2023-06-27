import { CouponModel } from "../../../Models/Coupon";
import CouponList from "../../CouponArea/CouponList/CouponList";

import "./Main.css";
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import { Login } from "../../AuthArea/Login/Login";
import App from "../../../App";
import { Children } from "react";



















type MainProps = {


}

function Main(props: MainProps): JSX.Element {
  
    return (
        <div className="Main">
            <Outlet/>
        </div>
    );
}

export default Main;
