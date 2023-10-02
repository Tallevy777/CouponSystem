
import "./Menu.css";

import { Link } from "react-router-dom";
import { useMyStore } from "../../../Zustand/Store";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeOutLinedIcon from '@mui/icons-material/Home';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

function Menu(): JSX.Element {
    const store = useMyStore()
    var endMenu = <></>
    switch (store.connectedClientType) {
        case "COMPANY":
            endMenu = <>
                <ListItemButton component={Link} to="/company/coupons">
                    <ListItemIcon>
                        <LocalAtmOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Coupons" />
                </ListItemButton>

                <ListItemButton component={Link} to="/company/getCompanyInfo">
                    <ListItemIcon>
                        <InfoOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Info" />
                </ListItemButton>
                {/* <Link to="/company/coupons">Coupons</Link>
                <Link to="/company/getCompanyInfo"> Info</Link> */}
            </>
            break;
        case "CUSTOMER":
            endMenu = <>
                <ListItemButton component={Link} to="/customer/allCoupons">
                    <ListItemIcon>
                        <LocalAtmOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Available Coupons" />
                </ListItemButton>

                <ListItemButton component={Link} to="/customer/coupons">
                    <ListItemIcon>
                        <CardTravelOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Coupons" />
                </ListItemButton>

                <ListItemButton component={Link} to="/customer/customer">
                    <ListItemIcon>
                        <InfoOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Info" />
                </ListItemButton>
                {/* <Link to="/customer/allCoupons">Available Coupons</Link>
                <Link to="/customer/coupons">My Coupons</Link>
                <Link to="/customer/customer"> Info</Link> */}
            </>
            break
        case "ADMINISTRATOR":
            endMenu = <>
                <ListItemButton component={Link} to="/admin/companies">
                    <ListItemIcon>
                        <AddBusinessOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage Companies" />
                </ListItemButton>

                <ListItemButton component={Link} to="/admin/customers">
                    <ListItemIcon>
                        <PersonAddAlt1OutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage Customers" />
                </ListItemButton>

                {/* <Link to="/admin/companies">Manage Companies</Link>
                <Link to="/admin/customers">Manage Customers</Link>
                <a href="#">Statistics</a> */}
            </>
            break
        default:
            endMenu = <>
                {/* <Link to="/login">Login</Link> */}
                <ListItemButton component={Link} to="/login">
                    <ListItemIcon>
                        <LoginOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log In" />
                </ListItemButton>

            </>
            break;
    }


    return (
        <Box sx={{ width: '100%', color: "white" }}>
            <nav aria-label="main menu">
                <List>
                    <ListItemButton component={Link} to="/">
                        <ListItemIcon>
                            <HomeOutLinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    {endMenu}
                </List>
            </nav>
        </Box>
    );


    // return (
    //     <div className="Menu flex-col-top-center">
    //         <Link to="/">Home</Link>
    //         {endMenu}
    //         <a href="#">About</a>
    //     </div>
    // );
}

export default Menu;
