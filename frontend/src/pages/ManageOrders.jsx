import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Button,
} from "@mui/material";
import useFetchAdminOrders from "../hooks/useFetchAdminOrders";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

function ManageOrders() {
    const { orders, loading, error } = useFetchAdminOrders();
    const [updatedOrders, setUpdatedOrders] = useState([]);

    useEffect(() => {
        if (orders) {
            setUpdatedOrders(orders);
        }
    }, [orders]);

    console.log("updatedOrders:", updatedOrders);
    console.log("orders:", orders);

    const getNextStatus = (currentStatus) => {
        const statusFlow = ["pending", "approved", "dispatched", "shipped"];
        const currentIndex = statusFlow.indexOf(currentStatus);
        return currentIndex !== -1 && currentIndex < statusFlow.length - 1
            ? statusFlow[currentIndex + 1]
            : currentStatus;
    };

    const handleStatusUpdate = async (orderId, currentStatus) => {
        const newStatus = getNextStatus(currentStatus);

        try {
            await axios.post(
                `/api/order/updatestatus`,
                {
                    order_id: orderId,
                    status: newStatus,
                },
                {
                    withCredentials: true,
                }
            );

            setUpdatedOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.order_id === orderId
                        ? { ...order, status: newStatus }
                        : order
                )
            );
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await axios.post(
                `/api/order/updatestatus`,
                {
                    order_id: orderId,
                    status: "cancelled",
                },
                {
                    withCredentials: true,
                }
            );

            // Update the state locally
            setUpdatedOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.order_id === orderId
                        ? { ...order, status: "cancelled" }
                        : order
                )
            );
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
    };

    if (loading) return <Loading />;
    if (error) return <Typography>Error loading orders.</Typography>;

    return (
        <section>
            <Typography
                mb={3}
                variant="h4"
                fontWeight={"bold"}
                textAlign={"center"}
            >
                Manage Orders
            </Typography>
            <TableContainer
                component={Paper}
                style={{
                    maxWidth: "80%",
                    margin: "0 auto",
                    backgroundColor: "whitesmoke",
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Order ID</b>
                            </TableCell>
                            <TableCell>
                                <b>Total Amount (RS)</b>
                            </TableCell>
                            <TableCell>
                                <b>Created At</b>
                            </TableCell>
                            <TableCell>
                                <b>Status</b>
                            </TableCell>
                            <TableCell>
                                <b>Action</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {updatedOrders.map((order) => (
                            <TableRow key={order.order_id}>
                                <TableCell>{order.order_id}</TableCell>
                                <TableCell>
                                    {"RS." + order.total_amount}
                                </TableCell>
                                <TableCell>
                                    {new Date(
                                        order.created_at
                                    ).toLocaleString()}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: {
                                            shipped: "green",
                                            cancelled: "red",
                                            approved: "blue",
                                            dispatched: "orange",
                                            pending: "#D9512C",
                                        }[order.status],
                                        fontWeight: "bold",
                                        textTransform: "capitalize",
                                    }}
                                >
                                    <Typography textTransform={"capitalize"}>
                                        {order.status}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {order.status !== "shipped" &&
                                        order.status !== "cancelled" && (
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        order.order_id,
                                                        order.status
                                                    )
                                                }
                                                style={{
                                                    marginRight: "8px",
                                                }}
                                            >
                                                Mark as{" "}
                                                {getNextStatus(order.status)}
                                            </Button>
                                        )}

                                    {order.status === "pending" && (
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() =>
                                                handleCancelOrder(
                                                    order.order_id
                                                )
                                            }
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
}

export default ManageOrders;
