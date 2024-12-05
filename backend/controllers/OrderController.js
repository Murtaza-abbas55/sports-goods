import {
    createOrder,
    CartToOrderProducts,
    getOrder,
    cancelOrder,
    getUserAllOrders,
    getAdminAssociatedOrders,
    updateorderstatus,
} from "../models/Orders.js";

export const createOrderController = async (req, res) => {
    const { user_id, shipping_address, total_amount } = req.body;
    console.log("createOrderController called with user_id:", user_id);

    try {
        if (!user_id) {
            console.log("User ID not provided in the request");
            return res
                .status(400)
                .json({ error: "User ID is required to create an order." });
        }

        const newOrder = await createOrder(
            user_id,
            shipping_address,
            total_amount
        );
        console.log(
            "Order created successfully with order_id:",
            newOrder.order_id
        );

        const transferResult = await CartToOrderProducts(
            user_id,
            newOrder.order_id
        );
        console.log("Cart transfer result:", transferResult.message);
        res.status(201).json({
            message: "Order created successfully and cart items transferred",
            order: newOrder,
        });
    } catch (error) {
        console.error("Error in createOrderController:", error);
        res.status(500).json({
            error: "Failed to create order and transfer cart items",
        });
    }
};
export const getOrderController = async (req, res) => {
    const { order_id } = req.params;

    try {
        if (!order_id) {
            return res
                .status(400)
                .json({ success: false, message: "order_id is required." });
        }

        const result = await getOrder(order_id);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getOrderController:", error.message);
        res.status(500).json({
            success: false,
            message: "Error fetching order details.",
        });
    }
};
export const cancelOrderController = async (req, res) => {
    const { order_id } = req.body;

    try {
        if (!order_id) {
            return res
                .status(400)
                .json({ success: false, message: "order_id is required." });
        }

        const result = await cancelOrder(order_id);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in cancelOrderController:", error.message);
        res.status(500).json({
            success: false,
            message: "Error canceling order.",
        });
    }
};
export const getUserOrdersController = async (req, res) => {
    const { user_id } = req.query;

    try {
        if (!user_id) {
            return res
                .status(400)
                .json({ success: false, message: "user_id is required." });
        }

        const result = await getUserAllOrders(user_id);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getUserOrdersController:", error.message);
        res.status(500).json({
            success: false,
            message: "Error fetching user orders.",
        });
    }
};
export const getAdminAssociatedOrdersController = async (req, res) => {
    const { admin_username } = req.adminUsername;
    try {
        if (!admin_username) {
            return res
                .status(400)
                .json({ success: false, message: "admin is required." });
        }
        const result = await getAdminAssociatedOrders(admin_username);
        res.status(200).json(result);
    } catch (error) {
        console.error(
            "Error in getAdminAssociatedOrdersController:",
            error.message
        );
        res.status(500).json({
            success: false,
            message: "Error fetching admin orders.",
        });
    }
};
export const Updateorderstatuscontroller = async (order_id, status) => {
    const { admin_username } = req.adminUsername;
    try {
        if (!admin_username) {
            return res
                .status(400)
                .json({ success: false, message: "admin is required." });
        }
        const result = await updateorderstatus(
            order_id,
            status,
            admin_username
        );
        res.status(200).json(result.message);
    } catch (error) {
        console.error("Error in updateOrderStatusController:", error.message);
        res.status(500).json({
            success: false,
            message: "Error updating order status.",
        });
    }
};
