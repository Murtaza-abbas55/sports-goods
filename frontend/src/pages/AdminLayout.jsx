import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <>
            <title>Admin</title>
            <Outlet />
        </>
    );
}

export default AdminLayout;
