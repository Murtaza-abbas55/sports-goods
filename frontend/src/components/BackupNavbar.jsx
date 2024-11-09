import { NavLink } from "react-router-dom";
function Navbar() {
    return (
        <header>
            <nav>
                <div className="logo">MyStore</div>
                <div className="container">
                    <NavLink>Football</NavLink>
                    <NavLink>Cricket</NavLink>
                    <NavLink>Hockey</NavLink>
                    <NavLink>Games</NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
