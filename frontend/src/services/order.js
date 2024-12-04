import axios from "axios";
import { Navigate } from "react-router-dom";

async function createOrder(
    user_id,
    shipping_address,
    total_amount,
    setOrderID
) {
    try {
        const response = await axios.post("/api/order/create", {
            user_id,
            shipping_address,
            total_amount,
        });
        console.log("create order");
        console.log(response);
        console.log(
            "response.data.order.order_id" + response.data.order.order_id
        );
        setOrderID(response.data.order.order_id);
    } catch (error) {
        console.error("Error while creating order:", error);
    }
}

async function cancelOrder(order_id) {
    try {
        const response = await axios.post("/api/order/cancelorder", {
            order_id,
        });
        console.log("cancel order");
        console.log(response);
    } catch (error) {
        console.error("Error while cancelling order:", error);
    }
}

export { createOrder, cancelOrder };
