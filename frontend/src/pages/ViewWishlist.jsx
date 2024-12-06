import useFetchUserWishlist from "../hooks/useFetchWishlist";
import { useEffect, useState } from "react";
import axios from "axios";
import ImgMediaCard from "../components/Card";
import Loading from "../components/Loading";
import Stack from "@mui/material/Stack";
import { Typography, Box } from "@mui/material";
import Empty from "../components/Empty";

function ViewWishlist() {
    const { wishlistItems } = useFetchUserWishlist(); // Fetch wishlist items
    const [products, setProducts] = useState([]); // Product data from backend
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products");
                const allProducts = response.data;

                // Filter products that match the wishlist
                const filteredProducts = allProducts.filter((product) =>
                    wishlistItems.some(
                        (wishlistItem) =>
                            wishlistItem.product_id === product.product_id
                    )
                );

                setProducts(filteredProducts); // Update products state with filtered data
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [wishlistItems]); // Re-run if wishlistItems change

    console.log("Final Products Matching Wishlist:", products);

    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;
    if (wishlistItems.length === 0)
        return <Empty message={"Add items to Wishlist"} size={100} />;

    return (
        <div>
            <Typography
                mb={3}
                variant="h4"
                fontWeight={"bold"}
                textAlign={"center"}
            >
                My Wishlist
            </Typography>
            <Stack direction={"row"} justifyContent={"center"} gap={5}>
                {products.map((item) => (
                    <ImgMediaCard
                        key={item.product_id}
                        name={item.name}
                        price={item.price}
                        image_url={`/images/${item.image_url}`}
                        product_id={item.product_id}
                    />
                ))}
            </Stack>
        </div>
    );
}

export default ViewWishlist;
