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
import Wishlist from "./Wishlist";

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
    handleAddToCart,
    newPrice,
}) {
    const [quantity, setQuantity] = useState(1);
    const handleAdd = () => setQuantity(quantity + 1);
    const handleRemove = () => setQuantity(quantity - 1);
    console.log("newPrice" + newPrice);

    return (
        <Card
            elevation={3}
            sx={{
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "column",
                width: 300,
                "&:hover": {
                    boxShadow: 10, // Elevation on hover
                },
                borderRadius: "1rem 1rem 0 0",
            }}
        >
            <Wishlist
                product_id={product_id}
                wishlistItems={wishlistItems}
                setWishlistItems={setWishlistItems}
                style={style}
            />

            <CardActionArea
                disabled={stock === 0}
                component={RouterLink}
                to={`product/${product_id}`}
                // href={product_id}
            >
                {/* <CardMedia
                    component="img"
                    alt="green iguana"
                    image={image_url}
                    sx={{ height: "250px" }}
                    loading="lazy"
                    height={"250px"}
                /> */}
                <img
                    src={image_url || "/public/images/fallback.jpg"}
                    alt={name}
                    height={"300px"}
                    width={"100%"}
                    onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = "/public/images/fallback.jpg"; // Set fallback image
                    }}
                />

                <Divider />
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                    }}
                >
                    <Typography
                        overflow={"clip"}
                        height={85}
                        fontWeight={"bold"}
                        gutterBottom
                        variant="body1"
                        component="h1"
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ flex: "1", color: "text.secondary" }}
                    >
                        {newPrice !== null ? (
                            <>
                                <span>{"RS. " + newPrice}</span>
                                <span
                                    style={{
                                        textDecoration: "line-through",
                                        marginLeft: "8px",
                                    }}
                                >
                                    {"RS. " + price}
                                </span>
                                <Typography
                                    ml={1.5}
                                    fontWeight={"bolder"}
                                    color="error"
                                    component={"span"}
                                >
                                    SALE
                                </Typography>
                            </>
                        ) : (
                            "RS. " + price
                        )}
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
                    disabled={stock <= 1 || stock === quantity}
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
                handleAddToCart={handleAddToCart}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "0.5rem auto",
                }}
            />
        </Card>
    );
}

export default ListingCard;
