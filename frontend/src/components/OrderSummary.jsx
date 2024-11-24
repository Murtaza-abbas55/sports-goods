import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";

function OrderSummary({ cartProducts }) {
    const marginFields = 2;
    const shipping = 300;
    const totalSum = cartProducts.reduce((sum, product) => {
        return sum + product.price * product.quantity; // Adjust based on your data structure
    }, 0);

    console.log("cartProducts");
    console.log(cartProducts);
    return (
        <Box width={"50%"} border={"solid 3px black"}>
            <Stack>
                <Typography
                    borderBottom={"solid 3px black"}
                    textAlign={"center"}
                    fontWeight={600}
                    variant="h4"
                    padding={2}
                >
                    ORDER SUMMARY
                </Typography>
                <Stack margin={marginFields} direction={"row"}>
                    <Typography flex={0.95} variant="h6">
                        SUB TOTAL
                    </Typography>
                    <Typography margin={"auto"}>{"RS." + totalSum}</Typography>
                </Stack>
                <Stack margin={marginFields} direction={"row"}>
                    <Typography flex={0.95} variant="h6">
                        SHIPPING
                    </Typography>
                    <Typography margin={"auto"}>{"RS." + shipping}</Typography>
                </Stack>
                <Stack
                    borderBottom={"solid 3px black"}
                    borderTop={"solid 3px black"}
                    direction={"row"}
                >
                    <Typography
                        fontWeight={"bold"}
                        margin={marginFields}
                        flex={0.95}
                        variant="h6"
                    >
                        TOTAL
                    </Typography>
                    <Typography fontWeight={"bold"} margin={"auto 10px"}>
                        {"RS." + (shipping + totalSum)}
                    </Typography>
                </Stack>
                <Box textAlign="center" fontWeight={"bold"}>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        startIcon={<ShoppingCartCheckoutOutlinedIcon />}
                        sx={{
                            borderRadius: "0",
                            fontWeight: "bold",
                            backgroundColor: "black",
                        }}
                    >
                        Checkout
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}
export default OrderSummary;
