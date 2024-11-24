import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import useFetch from "../hooks/useFetch";
import { Stack } from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DrawerAppBar from "../components/Navbar";
import Loading from "../components/Loading";
import { Outlet } from "react-router-dom";

function ProductListing() {
    // const [cartID, setCartID] = useState(null);
    const [wishlistItems, setWishlistItems] = useState([]);
    const { products, setProducts, loading, error } = useFetch("/api/products");
    const { Data } = useAuth();
    const { cartID, setCartID } = useAuth();

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                if (Data !== null) {
                    const response = await axios.get("/api/getallwishlist");
                    setWishlistItems(response.data.wishlistItems);
                    // console.log(response.data);
                    console.log("we wish");
                    console.log(response.data.wishlistItems);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                console.log("finally");
            }
        };

        fetchWishlist();
    }, []);
    console.log(wishlistItems);

    async function handleAddToCart(product_id, quantity, setQuantity) {
        // setLoading(true); // Show loading spinner

        console.log("these are add to cart");
        console.log({ product_id, quantity });
        try {
            const response = await axios.post("/api/add", {
                product_id,
                cartId: cartID,
                quantity,
            });
            console.log(response.data);
            setCartID(response.data.cartId);
            setQuantity(1);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.product_id === product_id
                        ? { ...product, stock: product.stock - quantity }
                        : product
                )
            ); // setToastMessage("Added to cart successfully!"); // Set success message
            // setToastOpen(true); // Show toast
        } catch (error) {
            console.error(
                "Error while adding product to cart:",
                error.response?.data || error.message
            );

            // setToastMessage("Failed to add to cart! Please try again."); // Set error message
            // setToastOpen(true); // Show toast
        }
    }

    if (loading) return <Loading />;
    if (error) return <p>error</p>;
    console.log(products);
    console.log("the cart now");
    console.log(cartID);

    return (
        <>
            <Stack
                direction={"row"}
                gap={4}
                flexWrap={"wrap"}
                justifyContent={"center"}
                marginBottom={5}
            >
                {products.map((product) => (
                    <div style={{ display: "flex" }} key={product.product_id}>
                        <ListingCard
                            product_id={product.product_id}
                            name={product.name}
                            price={product.price}
                            stock={product.stock}
                            image_url={"/images/" + product.image_url}
                            cartID={cartID}
                            wishlistItems={wishlistItems}
                            setWishlistItems={setWishlistItems}
                            handleAddToCart={handleAddToCart}
                        />
                    </div>
                ))}
            </Stack>
        </>
    );
}
export default ProductListing;
