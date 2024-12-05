import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const UserDashboard = () => {
    const { userId } = useParams();
    const { Data, logout } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!Data?.isUser || Data?.user_id != userId) {
            navigate("/login"); // Redirect to login if not authenticated
        }
    }, [Data, userId, navigate]);

    async function handleLogout() {
        logout(); // Clear auth context and local storage
        navigate("/"); // Redirect to home page
    }

    return (
        <div>
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
                <Button
                    variant="contained"
                    sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                    size="large"
                    component={RouterLink}
                    to={"view-wishlist"}
                >
                    View Wishlist
                </Button>

                <Button
                    variant="contained"
                    sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                    size="large"
                    onClick={handleLogout}
                    style={{ marginTop: "20px" }}
                >
                    Logout
                </Button>
            </Box>
        </div>
    );
};

export default UserDashboard;
