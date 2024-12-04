import axios from "axios";

async function createPayment(order_id, payment_method) {
    try {
        const response = await axios.post("/api/payment", {
            order_id,
            payment_method,
        });
        console.log("create payment");
        console.log(response);
    } catch (error) {
        console.error("frontend Error while creating payment:", error);
    }
}

async function cancelOrder() {
    try {
        const response = await axios.post("/api/order/cancelorder", {
            order_id: 353,
        });
        console.log("cancel order");
        console.log(response);
    } catch (error) {
        console.error("Error while cancelling order:", error);
    }
}

export { createPayment, cancelOrder };
