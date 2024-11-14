import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function AdminHome() {
    const { Data } = useAuth();
    return (
        <div>
            {Data ? (
                <div>
                    <p>Welcome, {Data.admin_username}!</p>
                    <p>Email: {Data.email}</p>
                    <p>Role: {Data.isAdmin ? "Admin" : "User"}</p>
                </div>
            ) : (
                <p>Not logged in.</p>
            )}
            <h1>Admin Homepage</h1>
            <Link to={"/"}>Home</Link>
        </div>
    );
}
export default AdminHome;
