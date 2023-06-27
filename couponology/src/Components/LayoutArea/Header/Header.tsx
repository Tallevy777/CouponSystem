
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMyStore } from "../../../Zustand/Store";
import Logout from "../../AuthArea/Logout/Logout";
import "./Header.css";

function Header(): JSX.Element {                  
    return (
            <div className="Header flex-center">
                <h1>Coupon System</h1>
                <Logout/>
            </div>
    );
}

export default Header;
