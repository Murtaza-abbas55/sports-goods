import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from "@mui/material";
import useFetchUserOrders from "../hooks/useFetchUserOrders";
import Empty from "../components/Empty";

function UserOrders() {
    const { orders, loading, error } = useFetchUserOrders();

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error loading orders.</Typography>;
    if (orders === undefined)
        return <Empty message={"You Have Not Ordered Anything"} size={100} />;

    return (
        <section>
            <Typography
                mb={3}
                variant="h4"
                fontWeight={"bold"}
                textAlign={"center"}
            >
                My Orders
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
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
                                    style={{
                                        color:
                                            order.status === "shipped"
                                                ? "green"
                                                : "#D9512C",
                                        fontWeight: "bold",
                                    }}
                                >
                                    <Typography textTransform={"capitalize"}>
                                        {order.status}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
}

export default UserOrders;
