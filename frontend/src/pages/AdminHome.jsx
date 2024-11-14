import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
function AdminHome() {
    const { Data } = useAuth();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                border: "solid 3px red",
            }}
            component={"section"}
        >
            <Typography variant="h3">
                Welcome Admin {Data.admin_username}
            </Typography>
            <Button
                variant="contained"
                sx={{ fontSize: "24px", width: "60vw" }}
                size="large"
            >
                Add Product
            </Button>
            <Button
                variant="contained"
                sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                size="large"
                component={RouterLink}
                to={"view-products"}
            >
                View Products
            </Button>
            <Button
                variant="contained"
                sx={{ fontSize: "24px", width: "60vw" }}
                size="large"
            >
                Delete Product
            </Button>
            <Button
                variant="contained"
                sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                size="large"
                component={RouterLink}
                to={"/"}
            >
                Back To home
            </Button>
            <Outlet />
        </Box>
    );
}
export default AdminHome;
