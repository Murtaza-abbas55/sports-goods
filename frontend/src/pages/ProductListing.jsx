import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import useFetch from "../hooks/useFetch";
import { Stack } from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DrawerAppBar from "../components/Navbar";

function ProductListing() {
    const [cartID, setCartID] = useState(null);

    const { products, loading, error } = useFetch("/api/products");

    const { Data } = useAuth();

    if (loading) return <p>loading</p>;
    if (error) return <p>error</p>;
    console.log(products);

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
                        />
                    </div>
                ))}
            </Stack>
        </>
    );
}
export default ProductListing;
