
import "./Menu.css";

import { Link } from "react-router-dom";
import { useMyStore } from "../../../Zustand/Store";

function Menu(): JSX.Element {

    const store = useMyStore()
    var endMenu = <></>
    switch (store.connectedClientType) {
        case "COMPANY":
            endMenu = <>
                <Link to="/company/coupons">Coupons</Link>
                <Link to="/company/getCompanyInfo"> Info</Link>
            </>
            break;
        case "CUSTOMER":
            endMenu = <>
                <Link to="/customer/allCoupons">Available Coupons</Link> 
                <Link to="/customer/coupons">My Coupons</Link>  
                <Link to="/customer/customer"> Info</Link>
            </>
            break
        case "ADMINISTRATOR":
            endMenu = <>
                <Link to="/admin/companies">Manage Companies</Link>
                <Link to="/admin/customers">Manage Customers</Link>
                <a href="#">Statistics</a>
            </>
            break
        default:
            endMenu = <>
                <Link to="/login">Login</Link>
            </>
            break;
    }

    return (
        <div className="Menu flex-col-top-center">
            <Link to="/">Home</Link>
            {endMenu}
            <a href="#">About</a>
        </div>
    );
}

export default Menu;
