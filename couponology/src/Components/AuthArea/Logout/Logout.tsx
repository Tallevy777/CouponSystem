import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMyStore } from "../../../Zustand/Store";
import "./Logout.css";
import { Button } from "@mui/material";

function Logout(): JSX.Element {
    const store = useMyStore();
    const nav = useNavigate();
    function OnLogout() {
        axios.defaults.headers.common['Authorization'] = "";
        store.logout()
        nav("/")
    }
    return (
        <div className="topright">
            {store.connectedClientType !== "" && <Button className="topright" variant="contained" onClick={OnLogout} >Logout</Button>}
        </div>
    );
}
export default Logout;
