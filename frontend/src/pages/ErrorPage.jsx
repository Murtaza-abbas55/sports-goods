import { Link as RouterLink } from "react-router-dom";
import { Link, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function ErrorPage() {
    const navigate = useNavigate();

    return (
        <>
            <h1>The Page Does Not Exist</h1>
            <Button variant="contained" onClick={() => navigate(-1)}>
                Go Back
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
