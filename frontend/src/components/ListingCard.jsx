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
import Modal from "@mui/material/Modal";
import { Link as RouterLink } from "react-router-dom";
import AddToCart from "./AddToCart";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const checkWishlistStatus = () => {
            const isInWishlist = wishlistItems.some(
                (item) => item.product_id === product_id
            );
            setWishlistStatus(isInWishlist);
        };

        checkWishlistStatus();
    }, [wishlistItems, product_id]); // Run this effect when wishlistItems or product_id changes

    const { Data, isAuthenticated } = useAuth();

    const handleAdd = () => setQuantity(quantity + 1);
    const handleRemove = () => setQuantity(quantity - 1);

    const handleCloseToast = () => {
        setToastOpen(false);
    };

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
            setWishlistStatus(true);
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

    async function handleRemoveFromWishlist() {
        setLoading(true); // Show loading spinner
        try {
            const response = await axios.post("/api/removewishlist", {
                product_id,
                wishlist_name: `${Data.user_id}'s Wishlist`,
                user_id: Data.user_id,
            });

            console.log(response.data);

            setToastMessage("Removed from wishlist!"); // Set success message
            setWishlistStatus(false);
            setToastOpen(true); // Show toast
        } catch (error) {
            console.error(
                "Error while removing from wishlist:",
                error.response?.data || error.message
            );

            setToastMessage(
                "Failed to remove from wishlist! Please try again."
            ); // Set error message
            setToastOpen(true); // Show toast
        } finally {
            setLoading(false); // Hide loading spinner
        }
    }

    function handleLogin() {
        setOpen(true);
    }

    return (
        <Card
            sx={{
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "column",
                width: 300,
                "&:hover": {
                    boxShadow: 10, // Elevation on hover
                },
            }}
        >
            <Button
                sx={{
                    width: "25px",
                    justifyContent: "start",
                    color: "red",
                }}
                onClick={() => {
                    if (Data && isAuthenticated) {
                        if (wishlistStatus) {
                            handleRemoveFromWishlist();
                        } else {
                            handleAddToWishlist();
                        }
                    } else {
                        handleLogin();
                    }
                }}
            >
                {!wishlistStatus ? (
                    <FavoriteBorderRoundedIcon />
                ) : (
                    <FavoriteRoundedIcon />
                )}
            </Button>
            <CardActionArea
                disabled={stock === 0}
                component={RouterLink}
                to={`${product_id}`}
                // href={product_id}
            >
                <CardMedia
                    component="img"
                    alt="green iguana"
                    image={image_url}
                    loading="lazy"
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

            <AddToCart
                product_id={product_id}
                cartID={cartID}
                quantity={quantity}
                setQuantity={setQuantity}
                stock={stock}
            />

            {/* Toast Notification */}
            <Snackbar
                open={toastOpen}
                autoHideDuration={3000} // Auto-close after 3 seconds
                onClose={handleCloseToast}
                message={toastMessage}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />

            {/* Active when guest tries to use wishlist */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Login to add items to wishlist
                    </Typography>
                    <Button
                        component={RouterLink}
                        to={"/login"}
                        variant="contained"
                    >
                        Log In
                    </Button>
                </Box>
            </Modal>
        </Card>
    );
}

export default ListingCard;
