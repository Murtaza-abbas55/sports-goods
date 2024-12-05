import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createOrder, cancelOrder } from "../services/order";
import axios from "axios";
import { Box, Button, Drawer, Stack } from "@mui/material";
import useFetchCartItems from "../hooks/useFetchCartItems";
import Typography from "@mui/material/Typography";
import DrawerAppBar from "../components/Navbar";
import CheckoutForm from "../components/CheckoutForm";
import PaymentForm from "../components/PaymentForm";

function Checkout() {
    const { Data } = useAuth();
    const { cartProducts, setCartProducts, fetchLoading } = useFetchCartItems();
    const [order_id, setOrderID] = useState(null);
    const [checkoutTurn, setCheckoutTurn] = useState(true);

    console.log(cartProducts);
    console.log(Data.user_id + "in check");
    const totalSum = cartProducts.reduce((sum, product) => {
        return sum + product.price * product.quantity; // Adjust based on your data structure
    }, 0);
    const tax = 0.05 * totalSum;
    const finalSum = tax + totalSum;

    return (
        <>
            <DrawerAppBar />
            <Stack direction={"row"}>
                <Stack flex={0.5}>
                    {checkoutTurn ? (
                        <CheckoutForm
                            user_id={Data.user_id}
                            total_amount={finalSum}
                            checkoutTurn={checkoutTurn}
                            setCheckoutTurn={setCheckoutTurn}
                            order_id={order_id}
                            setOrderID={setOrderID}
                        />
                    ) : (
                        <PaymentForm order_id={order_id} />
                    )}
                    <Button onClick={() => createOrder(Data.user_id)}>
                        Click
                    </Button>
                    <Button onClick={cancelOrder}>Remove</Button>
                </Stack>
                <Stack gap={10} flex={0.5}>
                    {cartProducts.map((cartProduct) => (
                        <Stack
                            gap={5}
                            direction={"row"}
                            key={cartProduct.product_id}
                        >
                            <Box>
                                <img
                                    src={`/images/${cartProduct.image_url}`}
                                    alt={`Image of ${cartProduct.name}`}
                                    height={150}
                                    width={150}
                                />
                            </Box>
                            <Stack>
                                <Typography
                                    fontWeight={"bold"}
                                    variant="body1"
                                    textTransform={"capitalize"}
                                    width={"400px"}
                                >
                                    {cartProduct.name}
                                </Typography>
                                <Typography variant="body1">
                                    {"x" + cartProduct.quantity}
                                </Typography>
                                <Typography
                                    sx={{ marginTop: "10px" }}
                                    variant="body1"
                                >
                                    RS.
                                    {cartProduct.quantity * cartProduct.price}
                                </Typography>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </>
    );
}
export default Checkout;
