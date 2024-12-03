import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { createOrder, cancelOrder } from "../services/order";
import axios from "axios";
import { Box, Button, Drawer, Stack } from "@mui/material";
import useFetchCartItems from "../hooks/useFetchCartItems";
import Typography from "@mui/material/Typography";
import DrawerAppBar from "../components/Navbar";
import CheckoutForm from "../components/CheckoutForm";

function Checkout() {
    const { Data } = useAuth();
    const { cartProducts, setCartProducts, fetchLoading } = useFetchCartItems();
    console.log(cartProducts);
    console.log(Data.user_id + "in check");

    return (
        <>
            <DrawerAppBar />
            <Stack direction={"row"}>
                <Stack flex={0.5}>
                    <CheckoutForm />
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
