import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const UserDashboard = () => {
    const { userId } = useParams();
    const { Data } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!Data?.isUser || Data?.user_id !== userId) {
            navigate("/login"); // Redirect to login if not authenticated
        }
    }, [Data, userId, navigate]);

    return (
        <div>
            <h1>Welcome to your dashboard, {Data?.user_id}!</h1>
            {/* User-specific content */}
        </div>
    );
};

export default UserDashboard;
