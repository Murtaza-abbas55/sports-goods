import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function useFetchUserOrders() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const { Data } = useAuth();

    console.log("Data order user");
    console.log(Data.user_id);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const response = await axios.get("/api/order/user", {
                    params: { user_id: Data.user_id },
                });
                console.log("my orders");
                console.log(response);
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching Orders:", error);
                setError("Error");
            } finally {
                setLoading(false);
            }
        };

        fetchUserOrders();
    }, [Data.user_id]);
    console.log(orders);
    return { orders, setOrders, loading, error };
}
export default useFetchUserOrders;
