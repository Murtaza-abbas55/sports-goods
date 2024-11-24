import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import DrawerAppBar from "../components/Navbar";
import useFetchCartItems from "../hooks/useFetchCartItems";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAuth } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../components/Loading";
import { handleRemove } from "../services/cart";
import { handleDecrease } from "../services/cart";
import { handleAdd } from "../services/cart";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import OrderSummary from "../components/OrderSummary";
import Empty from "../components/Empty";
import useFetch from "../hooks/useFetch";

function Cart() {
    const { cartProducts, setCartProducts, fetchLoading } = useFetchCartItems();
    const { products, setProducts, error } = useFetch("/api/products");
    const [loading, setLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const { cartID } = useAuth();
    console.log("cart id cart page " + cartID);

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    console.log("cart page");
    console.log(cartProducts);

    // color fafafa
    if (fetchLoading) return <Loading />;
    return (
        <>
            <DrawerAppBar />
            <Typography textAlign={"center"} component={"h1"} variant="h5">
                SHOPPING CART
            </Typography>
            <Divider sx={{ margin: "20px 0" }} />
            {cartProducts.length !== 0 ? (
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
                                        <Typography
                                            sx={{ marginTop: "10px" }}
                                            variant="body1"
                                        >
                                            RS.
                                            {cartProduct.quantity *
                                                cartProduct.price}
                                        </Typography>
                                        <Box marginLeft={-1} marginTop={5}>
                                            <Stack direction={"row"}>
                                                <IconButton
                                                    disabled={
                                                        cartProduct.quantity <=
                                                        1
                                                    }
                                                    onClick={() =>
                                                        handleDecrease(
                                                            cartProduct.product_id,
                                                            setLoading,
                                                            setToastMessage,
                                                            setToastOpen,
                                                            setCartProducts,
                                                            cartID
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
                                                    disabled={
                                                        cartProduct.stock === 0
                                                    }
                                                    onClick={() =>
                                                        handleAdd(
                                                            cartProduct.product_id,
                                                            setLoading,
                                                            setToastMessage,
                                                            setToastOpen,
                                                            setCartProducts,
                                                            cartID
                                                        )
                                                    }
                                                    aria-label="increase quantity"
                                                >
                                                    <AddCircleIcon />
                                                </IconButton>
                                            </Stack>
                                            <Box marginTop={3} display={"flex"}>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="error"
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() =>
                                                        handleRemove(
                                                            cartProduct.product_id,
                                                            setLoading,
                                                            setToastMessage,
                                                            setToastOpen,
                                                            setCartProducts,
                                                            cartID
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <img
                                            src={`/images/${cartProduct.image_url}`}
                                            alt={`Image of ${cartProduct.name}`}
                                            height={250}
                                            width={200}
                                        />
                                    </Box>
                                </Stack>
                                <Divider sx={{ margin: "20px 0" }} />
                            </Box>
                        ))}
                    </Stack>
                    <Stack position={"sticky"} flex={0.5} alignItems={"center"}>
                        <OrderSummary cartProducts={cartProducts} />
                    </Stack>
                    {/* Toast Notification */}
                    <Snackbar
                        open={toastOpen}
                        autoHideDuration={3000} // Auto-close after 3 seconds
                        onClose={handleCloseToast}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                    >
                        <Alert
                            onClose={handleCloseToast}
                            severity={"success"}
                            sx={{ width: "100%" }}
                        >
                            {toastMessage}
                        </Alert>
                    </Snackbar>
                </Stack>
            ) : (
                <Empty size={"10rem"} message={"Add Items To Cart"} />
            )}
        </>
    );
}
export default Cart;
