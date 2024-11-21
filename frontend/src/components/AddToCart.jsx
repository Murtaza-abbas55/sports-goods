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

function AddToCart({ product_id, cartID, quantity, stock, style }) {
    const [loading, setLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

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
        <>
            {stock > 0 ? (
                <Button
                    sx={style}
                    size="large"
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
        </>
    );
}
export default AddToCart;
