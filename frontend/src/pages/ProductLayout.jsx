import { Outlet } from "react-router-dom";
import DrawerAppBar from "../components/Navbar";

function ProductLayout() {
    return (
        <>
            <title>Admin</title>
            <DrawerAppBar />
            <Outlet />
        </>
    );
}

export default ProductLayout;
