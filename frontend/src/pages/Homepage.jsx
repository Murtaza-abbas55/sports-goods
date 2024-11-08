import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
function Header() {
    return (
        <header>
            <AppBar>
                <div>E-commerce</div>
                <Link href="#">Tennis</Link>
            </AppBar>
        </header>
    );
}
export default Header;
