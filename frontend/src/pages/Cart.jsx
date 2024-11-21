import { Box, Divider, Stack, Typography } from "@mui/material";
import DrawerAppBar from "../components/Navbar";
import useFetchCartItems from "../hooks/useFetchCartItems";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Cart() {
    const { cartProducts, setCartProducts } = useFetchCartItems();
    const [loading, setLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const { cartID } = useAuth();
    console.log("cart id cart page " + cartID);

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    async function handleAdd(product_id) {
        setLoading(true); // Show loading spinner
        try {
            const response = await axios.post("/api/add", {
                product_id,
                cartId: cartID,
                quantity: 1,
            });
            console.log(response.data);
            setToastMessage("Added to cart successfully!"); // Set success message
            setToastOpen(true); // Show toast
            setCartProducts((prevProducts) =>
                prevProducts.map((cartProduct) =>
                    cartProduct.product_id === product_id
                        ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
                        : cartProduct
                )
            );
        } catch (error) {
            console.error(
                "Error while adding product to cart:",
                error.response?.data || error.message
            );

            setToastMessage("Failed to add to cart! Please try again."); // Set error message
            setToastOpen(true); // Show toast
        } finally {
            setLoading(false); // Hide loading spinner
        }
    }

    async function handleRemove(product_id) {
        setLoading(true); // Show loading spinner
        try {
            const response = await axios.post("/api/remove", {
                product_id,
                cartId: cartID,
            });
            console.log(response.data);
            setToastMessage("Removed from cart!"); // Set success message
            setToastOpen(true); // Show toast
        } catch (error) {
            console.error(
                "Error while removing product from cart:",
                error.response?.data || error.message
            );

            setToastMessage("Failed to remove from cart! Please try again."); // Set error message
            setToastOpen(true); // Show toast
        } finally {
            setLoading(false); // Hide loading spinner
        }
    }

    console.log("cart page");
    console.log(cartProducts);
    return (
        <>
            <DrawerAppBar />
            <Typography textAlign={"center"} component={"h1"} variant="h5">
                SHOPPING CART
            </Typography>
            <Divider sx={{ margin: "20px 0" }} />
            <Stack direction={"row"}>
                <Stack flex={0.5}>
                    {cartProducts.map((cartProduct) => (
                        <Box key={cartProduct.product_id}>
                            <Stack gap={5} marginLeft={3} direction={"row"}>
                                <Box flex={1}>
                                    <Typography
                                        fontWeight={"bold"}
                                        variant="h5"
                                        textTransform={"capitalize"}
                                    >
                                        {cartProduct.name}
                                    </Typography>

                                    <Box marginLeft={-1} marginTop={5}>
                                        <Stack direction={"row"}>
                                            <IconButton
                                                onClick={() =>
                                                    handleRemove(
                                                        cartProduct.product_id
                                                    )
                                                }
                                                aria-label="decrease quantity"
                                            >
                                                <RemoveCircleIcon />
                                            </IconButton>
                                            <Typography marginTop={1}>
                                                {!loading ? (
                                                    cartProduct.quantity
                                                ) : (
                                                    <CircularProgress
                                                        size={10}
                                                    />
                                                )}
                                            </Typography>
                                            <IconButton
                                                onClick={() =>
                                                    handleAdd(
                                                        cartProduct.product_id
                                                    )
                                                }
                                                aria-label="increase quantity"
                                            >
                                                <AddCircleIcon />
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                </Box>

                                <Box
                                    height={250}
                                    width={200}
                                    sx={{ backgroundColor: "black" }}
                                ></Box>
                            </Stack>
                            <Divider sx={{ margin: "20px 0" }} />
                        </Box>
                    ))}
                </Stack>
                <Stack></Stack>
            </Stack>
        </>
    );
}
export default Cart;
