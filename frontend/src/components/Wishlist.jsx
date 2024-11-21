import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Divider, Snackbar } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Link as RouterLink } from "react-router-dom";

function Wishlist({
    product_id,
    wishlistItems,
    setWishlistItems,
    style,
    modalStyle,
}) {
    const [loading, setLoading] = useState(false);
    const { Data, isAuthenticated } = useAuth();
    const [wishlistStatus, setWishlistStatus] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    useEffect(() => {
        const checkWishlistStatus = () => {
            const isInWishlist = wishlistItems.some(
                (item) => item.product_id === product_id
            );
            setWishlistStatus(isInWishlist);
        };

        checkWishlistStatus();
    }, [wishlistItems, product_id]); // Run this effect when wishlistItems or product_id changes

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
        <>
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
                modalStyle={modalStyle}
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
        </>
    );
}
export default Wishlist;
