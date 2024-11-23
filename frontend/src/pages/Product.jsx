import { Box, Button, colors, Divider, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import AddToCart from "../components/AddToCart";
import { useAuth } from "../context/AuthContext";
import useFetchWishlist from "../hooks/useFetchWishlist";
import Wishlist from "../components/Wishlist";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Reviews from "../components/Reviews";

const modalStyle = {
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

function Product() {
    let { product_id } = useParams();
    console.log("id");
    console.log({ product_id });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { cartID } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const handleAdd = () => setQuantity(quantity + 1);
    const handleRemove = () => setQuantity(quantity - 1);

    const { wishlistItems, setWishlistItems } = useFetchWishlist();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/products/${product_id}`);
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [product_id]);

    if (loading) return <Loading />;
    if (error) return <p>error</p>;
    console.log(products);
    console.log("the cart now");
    console.log(cartID);

    console.log("products");
    console.log(products);

    if (loading) return <Loading />;

    return (
        <>
            <Stack
                direction={{ sm: "row" }}
                justifyContent={"center"}
                alignItems={{ xs: "center", sm: "start" }}
                // border={"solid 3px blue"}
                gap={2}
                // marginTop={{ xs: "5rem", sm: "10rem" }}
            >
                <Box alignSelf={"center"}>
                    <img
                        style={{ verticalAlign: "center" }}
                        src={`/images/${products.image_url}`}
                        alt="basket"
                        width={"600px"}
                        height={"600px"}
                    />
                </Box>
                <Divider />
                <Box>
                    <Stack alignItems={"center"} justifyContent={"center"}>
                        <Box padding={2} maxWidth={500}>
                            <Typography
                                gutterBottom
                                variant="h3"
                                fontWeight={"bold"}
                            >
                                {products.name}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h5"
                                fontWeight={"bold"}
                            >
                                {"RS " + products.price}
                            </Typography>
                            <Typography
                                textAlign={"justify"}
                                gutterBottom
                                component="p"
                                marginBottom={5}
                            >
                                {products.description}
                            </Typography>
                            <Box display={"flex"} flexDirection={"column"}>
                                <Box marginLeft={6}>
                                    <Wishlist
                                        product_id={products.product_id}
                                        wishlistItems={wishlistItems}
                                        setWishlistItems={setWishlistItems}
                                        style={modalStyle}
                                    />
                                </Box>
                                <Box display={"flex"} gap={3}>
                                    <IconButton
                                        disabled={quantity === 1}
                                        onClick={handleRemove}
                                        aria-label="decrease quantity"
                                    >
                                        <RemoveCircleIcon />
                                    </IconButton>

                                    <Box>
                                        <Typography marginTop={1}>
                                            {quantity}
                                        </Typography>
                                    </Box>

                                    <IconButton
                                        disabled={
                                            products.stock <= 1 ||
                                            products.stock === quantity
                                        }
                                        onClick={handleAdd}
                                        aria-label="increase quantity"
                                    >
                                        <AddCircleIcon />
                                    </IconButton>
                                </Box>
                                <AddToCart
                                    product_id={products.product_id}
                                    stock={products.stock}
                                    cartID={cartID}
                                    quantity={quantity}
                                    style={{
                                        alignSelf: "start",
                                    }}
                                />
                            </Box>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
            <Reviews product_id={product_id} />
        </>
    );
}
export default Product;
