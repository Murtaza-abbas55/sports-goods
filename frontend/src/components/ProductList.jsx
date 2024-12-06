import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from "@mui/material";
import Loading from "./Loading";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { Data } = useAuth(); // Access Data instead of user

    // Fetch the products from the backend using axios
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products");
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
    }, []);

    if (loading) return <Loading />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box padding={3}>
            <Typography variant="h4" gutterBottom>
                Product Items
            </Typography>

            {products.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <strong>Product ID</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Name</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Category ID</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Description</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Price</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Stock</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Image</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.product_id}>
                                    <TableCell>{product.product_id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.category_id}</TableCell>
                                    <TableCell
                                        align="justify"
                                        sx={{ maxWidth: "250px" }}
                                    >
                                        {product.description}
                                    </TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>
                                        <img
                                            src={`/images/${product.image_url}`}
                                            alt="Product"
                                            style={{
                                                width: "75px",
                                                height: "75px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography>No products available.</Typography>
            )}
            <Box mt={3}>
                <Link to="/admin" style={{ textDecoration: "none" }}>
                    <Typography variant="button" color="primary">
                        Home
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default ProductList;
