import { Outlet } from "react-router-dom";
import DrawerAppBar from "../components/Navbar";

function UserLayout() {
    return (
        <>
            <title>User</title>
            <DrawerAppBar />
            <Outlet />
        </>
    );
}

export default UserLayout;
