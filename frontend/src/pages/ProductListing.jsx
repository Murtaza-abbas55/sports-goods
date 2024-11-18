import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import useFetch from "../hooks/useFetch";
import { Stack } from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DrawerAppBar from "../components/Navbar";
import Loading from "../components/Loading";

function ProductListing() {
    // const [cartID, setCartID] = useState(null);
    const [wishlistItems, setWishlistItems] = useState([]);
    const { products, loading, error } = useFetch("/api/products");
    const { Data } = useAuth();
    const { cartID } = useAuth();

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

    if (loading) return <Loading />;
    if (error) return <p>error</p>;
    console.log(products);
    console.log("the cart now");
    console.log(cartID);

    return (
        <>
            <DrawerAppBar />
            <h1>Product Lisitng</h1>
            <p>These are my products</p>
            <Stack
                direction={"row"}
                gap={2}
                flexWrap={"wrap"}
                justifyContent={"center"}
            >
                {products.map((product) => (
                    <div style={{ display: "flex" }} key={product.product_id}>
                        <ListingCard
                            product_id={product.product_id}
                            name={product.name}
                            price={product.price}
                            stock={product.stock}
                            image_url={"./images/" + product.image_url}
                            cartID={cartID}
                            wishlistItems={wishlistItems}
                            setWishlistItems={setWishlistItems}
                        />
                    </div>
                ))}
            </Stack>
        </>
    );
}
export default ProductListing;
