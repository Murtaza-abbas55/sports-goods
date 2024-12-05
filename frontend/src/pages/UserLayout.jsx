import { Outlet } from "react-router-dom";
import DrawerAppBar from "../components/Navbar";
import useFetchUserDetails from "../hooks/useFetchUserDetails";

function UserLayout() {
    const { userDetails, setUserDetails, loading, error } =
        useFetchUserDetails();

    return (
        <>
            <title>User</title>
            <DrawerAppBar />
            <Outlet />
        </>
    );
}

export default UserLayout;
