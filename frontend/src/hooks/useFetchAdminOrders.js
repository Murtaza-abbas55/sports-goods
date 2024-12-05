import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function useFetchAdminOrders() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const { Data } = useAuth();

    console.log("Data order admin");
    console.log(Data.admin_username);

    useEffect(() => {
        const fetchAdminOrders = async () => {
            try {
                const response = await axios.get("/api/order/admin", {
                    params: { admin_username: Data.admin_username },
                });
                console.log("my orders admin");
                console.log(response);
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching Orders:", error);
                setError("Error");
            } finally {
                setLoading(false);
            }
        };

        fetchAdminOrders();
    }, [Data.admin_username]);
    console.log(orders);
    return { orders, setOrders, loading, error };
}
export default useFetchAdminOrders;
