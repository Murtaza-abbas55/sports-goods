import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function AdminLayout() {
    return (
        <>
            <title>Admin</title>
            <AdminNavbar />
            <Outlet />
        </>
    );
}

export default AdminLayout;
