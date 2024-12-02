import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const UserDashboard = () => {
    const { user_id } = useParams();
    console.log("user_id");
    console.log(user_id);
    const { Data } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!Data?.isUser || Data?.user_id != user_id) {
            navigate("/login"); // Redirect to login if not authenticated
        }
    }, [Data, user_id, navigate]);

    return (
        <div>
            <h1>Welcome to your dashboard, {Data?.user_id}!</h1>
            {/* User-specific content */}
        </div>
    );
};

export default UserDashboard;
