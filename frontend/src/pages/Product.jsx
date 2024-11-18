import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";

function Product() {
    let { product_id } = useParams();
    console.log("id");
    console.log({ product_id });

    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/products/${product_id}`);
                setProducts(response.data[0]);
                console.log(response.data[0]);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
                        width={"700px"}
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
                                RS.2000
                            </Typography>
                            <Typography
                                textAlign={"justify"}
                                gutterBottom
                                component="p"
                                marginBottom={5}
                            >
                                {products.description}
                            </Typography>
                            <Button variant="contained">Add to Cart</Button>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </>
    );
}
export default Product;
