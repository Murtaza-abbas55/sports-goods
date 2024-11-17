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
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

function ListingCard({
    product_id,
    name,
    price,
    stock,
    image_url,
    cartID,
    wishlistItems,
    setWishlistItems,
}) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [wishlistStatus, setWishlistStatus] = useState(false);

    // function checkWishlistStatus() {
    //     wishlistItems.forEach((item) => {
    //         if (item.product_id === product_id) setWishlistStatus(true);
    //     });
    // }
    // checkWishlistStatus();

    useEffect(() => {
        const checkWishlistStatus = () => {
            const isInWishlist = wishlistItems.some(
                (item) => item.product_id === product_id
            );
            setWishlistStatus(isInWishlist);
        };

        checkWishlistStatus();
    }, [wishlistItems, product_id]); // Run this effect when wishlistItems or product_id changes

    const { Data } = useAuth();

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

    async function handleAddToWishlist() {
        setLoading(true); // Show loading spinner
        try {
            const response = await axios.post("/api/addwishlist", {
                product_id,
                wishlist_name: `${Data.user_id}'s Wishlist`,
                user_id: Data.user_id,
            });

            console.log(response.data);

            setToastMessage("Added to wishlist successfully!"); // Set success message
            setToastOpen(true); // Show toast
        } catch (error) {
            console.error(
                "Error while adding product to cart:",
                error.response?.data || error.message
            );

            setToastMessage("Failed to add to wishlist! Please try again."); // Set error message
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
            <Button
                sx={{
                    width: "25px",
                    justifyContent: "start",
                    color: "red",
                }}
                onClick={handleAddToWishlist}
                // size="large"
            >
                {!wishlistStatus ? (
                    <FavoriteBorderRoundedIcon />
                ) : (
                    <FavoriteRoundedIcon />
                )}
            </Button>
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
