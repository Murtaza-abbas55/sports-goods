import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
function ErrorPage() {
    return (
        <>
            <h1>The Page Does Not Exist</h1>
            <Link component={RouterLink} to="/">
                Return Home
            </Link>
        </>
    );
}
export default ErrorPage;
