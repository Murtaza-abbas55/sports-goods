import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Divider, Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import axios from "axios";

function ListingCard({ product_id, name, price, stock, image_url, cartID }) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleAdd = () => setQuantity(quantity + 1);
    const handleRemove = () => setQuantity(quantity - 1);

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    async function handleAddToCart() {
        setLoading(true); // Show loading spinner
        try {
            const response = await axios.post("/api/add", {
                product_id,
                cartId: cartID,
                quantity,
            });

            console.log(response.data);

            setToastMessage("Added to cart successfully!"); // Set success message
            setToastOpen(true); // Show toast
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

    return (
        <Card
            sx={{
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "column",
                width: 300,
            }}
        >
            <CardActionArea disabled={stock === 0} href="/">
                <CardMedia
                    component="img"
                    alt="green iguana"
                    image={image_url}
                    height={"250px"}
                />
                <Divider />
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ flex: "1", color: "text.secondary" }}
                    >
                        {"RS. " + price}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                }}
            >
                <IconButton
                    disabled={quantity === 1}
                    onClick={handleRemove}
                    aria-label="decrease quantity"
                >
                    <RemoveCircleIcon />
                </IconButton>

                <Box>
                    <Typography marginTop={1}>{quantity}</Typography>
                </Box>

                <IconButton
                    disabled={quantity === stock}
                    onClick={handleAdd}
                    aria-label="increase quantity"
                >
                    <AddCircleIcon />
                </IconButton>
            </Box>

            {stock > 0 ? (
                <Button
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "0.5rem auto",
                    }}
                    variant="outlined"
                    onClick={handleAddToCart}
                    disabled={loading} // Disable button during loading
                >
                    {loading ? <CircularProgress size={20} /> : "Add to Cart"}
                </Button>
            ) : (
                <Button
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "0.5rem auto",
                    }}
                    variant="contained"
                    disabled
                >
                    Out of Stock
                </Button>
            )}

            {/* Toast Notification */}
            <Snackbar
                open={toastOpen}
                autoHideDuration={3000} // Auto-close after 3 seconds
                onClose={handleCloseToast}
                message={toastMessage}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </Card>
    );
}

export default ListingCard;
