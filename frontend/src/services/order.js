import axios from "axios";

async function createOrder(user_id) {
    try {
        const response = await axios.post("/api/order/create", {
            user_id: user_id,
        });
        console.log("create order");
        console.log(response);
    } catch (error) {
        console.error("Error while creating order:", error);
    }
}

async function cancelOrder() {
    try {
        const response = await axios.post("/api/order/cancelorder", {
            order_id: 82,
        });
        console.log("cancel order");
        console.log(response);
    } catch (error) {
        console.error("Error while cancelling order:", error);
    }
}

export { createOrder, cancelOrder };
