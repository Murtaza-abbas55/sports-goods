import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";

const UserDashboard = () => {
    const { userId } = useParams();
    const { Data, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!Data?.isUser || Data?.user_id != userId) {
            navigate("/login"); // Redirect to login if not authenticated
        }
    }, [Data, userId, navigate]);

    async function handleLogout() {
        // try {
            //const response = await axios.post('/api/user-logout'); // Replace with your actual API path
            logout(); // Clear auth context and local storage
            navigate('/'); // Redirect to home page
            //console.log(response.data.message);
        // } catch (error) {
        //     console.error('Error logging out:', error);
        // }
    }
    

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to your dashboard, {Data?.user_id}!</h1>
            {/* User-specific content */}
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleLogout}
                style={{ marginTop: "20px" }}
            >
                Logout
            </Button>
        </div>
    );
};

export default UserDashboard;
