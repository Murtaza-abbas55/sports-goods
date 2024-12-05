import { Outlet } from "react-router-dom";
import DrawerAppBar from "../components/Navbar";
import useFetchUserDetails from "../hooks/useFetchUserDetails";

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
