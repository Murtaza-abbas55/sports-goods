import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
function AdminHome() {
    const { Data, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogOut() {
        logout();
        navigate("/");
    }
    return (
        <Box
            sx={{
                display: "flex",
                textAlign: "center",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
            component={"section"}
        >
            <Typography variant="h3">
                Welcome Admin {Data.admin_username}
            </Typography>

            <Button
                variant="contained"
                sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                size="large"
                component={RouterLink}
                to={"add-product"}
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
                sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                size="large"
                component={RouterLink}
                to={"delete-product"}
            >
                Delete Product
            </Button>

            <Button
                variant="contained"
                sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                size="large"
                component={RouterLink}
                to={"update-product"}
            >
                Update Product
            </Button>

            <Button
                variant="contained"
                sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                size="large"
                component={RouterLink}
                to={"manage-categories"}
            >
                Manage Categories
            </Button>

            <Button
                variant="contained"
                sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                size="large"
                component={RouterLink}
                to={"manage-orders"}
            >
                Manage Orders
            </Button>

            <Button
                variant="contained"
                sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                size="large"
                component={RouterLink}
                to={"sale"}
            >
                Manage Sale
            </Button>

            <Button
                variant="contained"
                sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                size="large"
                component={RouterLink}
                to={"new-admin"}
            >
                Add New Admin
            </Button>

            <Button
                variant="contained"
                sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                size="large"
                onClick={handleLogOut}
            >
                Log out
            </Button>
            <Outlet />
        </Box>
    );
}
export default AdminHome;
