import { Link as RouterLink } from "react-router-dom";
import { Link, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function ErrorPage() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    function handleLogOut() {
        logout();
        navigate("/");
    }

    return (
        <>
            <h1>The Page Does Not Exist</h1>
            <Button variant="contained" onClick={() => navigate(-1)}>
                Go Back
            </Button>
            <Button variant="contained" onClick={handleLogOut}>
                Log Out
            </Button>
            {/* Optionally include a link to return home */}
            <Link
                component={RouterLink}
                to="/"
                sx={{ display: "block", marginTop: "1em" }}
            >
                Return Home
            </Link>
        </>
    );
}
export default ErrorPage;
