import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function ErrorPage(): JSX.Element {
    const nav = useNavigate();
    function GoHome() {
        nav("/")
    }

    return <Box style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#1b1e23",
        color: "white",
        height: "100%"
    }}>
        <h1 className="ErrorPage flex-center">404 - Page Not Found!</h1>
        <br />
        <h2 className="ErrorPage flex-center">There's nothing to see here</h2>
        <br />
        <img src="https://cdn.dribbble.com/users/1190086/screenshots/7780963/media/02564c983af71888c5ba1091cb136101.gif" alt="404 Not Found"></img>
        <br />
        <Button variant="contained" size="medium" onClick={GoHome}>Go to Home Screen</Button>
    </Box>
}
