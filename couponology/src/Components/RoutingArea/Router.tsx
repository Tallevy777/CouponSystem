import path from "path";
import { createBrowserRouter, useParams } from "react-router-dom";
import App from "../../App";
import { CustomerModel } from "../../Models/Customer";
import { Login } from "../AuthArea/Login/Login";
import { CouponItem } from "../CouponArea/CouponItem/CouponItem";
import CouponList from "../CouponArea/CouponList/CouponList";
import { AboutComponent } from "../PagesArea/AboutComponenet";
import { AdminComponent } from "../PagesArea/AdminComponent";
import { CompanyComponent } from "../PagesArea/CompanyComponent";
import { CustomerComponent } from "../PagesArea/CustomerComponent";
import { WelcomePage } from "../PagesArea/WelcomePage";
import CustomerList from "../CustomerArea/CustomerList/CustomerList";
import CompanyList from "../CompanyArea/CompanyList/CompanyList";
import { ErrorPage } from "../PagesArea/ErrorPage/ErrorPage";


export const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <WelcomePage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/company",
        element: <CompanyComponent />,
        children: [{
          path: "coupons",
          element: <CouponList urlPrefix="" isAllCoupons={true} />,
        }, {
          path: "/company/getCompanyInfo",
          element: <AboutComponent />
        }, {
          path: "coupons/:couponId",
          element: <CouponItem isShowAmount={true} />,
        }]
      },
      {
        path: "/customer",
        element: <CustomerComponent />,
        children: [{
          path: "coupons",
          element: <CouponList urlPrefix="customer/coupon" />,
        }, {
          path: "coupon/:couponId",
          element: <CouponItem isShowAmount={false} />,
        },
        {
          path: "allCoupons",
          element: <CouponList urlPrefix="customer/coupon" isAllCoupons={true} />,

        }, {
          path: "/customer/customer",
          element: <AboutComponent />
        }]
      },
      {
        path: "/admin",
        element: <AdminComponent />,
        children: [{
          path: "customers",
          element: <CustomerList />,
        }, {
          path: "companies",
          element: <CompanyList />,
        }]
      },
    ]
  }
])