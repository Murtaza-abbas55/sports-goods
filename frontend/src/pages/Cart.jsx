import { Box, Divider, Stack, Typography } from "@mui/material";
import DrawerAppBar from "../components/Navbar";
import useFetchCartItems from "../hooks/useFetchCartItems";
import useFetchProductByID from "../hooks/useFetchProductByID";

function Cart() {
    const { cartProducts, setCartProducts } = useFetchCartItems();

    console.log("cart page");
    console.log(cartProducts);
    return (
        <>
            <DrawerAppBar />
            <Typography textAlign={"center"} component={"h1"} variant="h5">
                SHOPPING CART
            </Typography>
            <Divider />
            <Stack direction={"row"}>
                <Stack flex={0.75}>
                    <Box>P1</Box>
                    <Box>P2</Box>
                    <Box>P3</Box>
                </Stack>
                <Stack></Stack>
            </Stack>
        </>
    );
}
export default Cart;
