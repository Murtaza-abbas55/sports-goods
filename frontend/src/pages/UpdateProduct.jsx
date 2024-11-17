import { useState, useEffect } from "react";
import axios from "axios";
import {
    Button,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
    Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";

function UpdateProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products");
                setProducts(response.data);
                console.log("Fetching products response.data");
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [products]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const handleShowButton = (product) => {
        setEditing(true);
        setEditingProduct(product);

        setValue("product_id", product.product_id);
        setValue("name", product.name);
        setValue("description", product.description);
        setValue("price", product.price);
        setValue("stock", product.stock);
        setValue("category_id", product.category_id);
        setValue("image", product.image);
    };

    const handleCancel = () => {
        setEditing(false);
        setEditingProduct(null);
    };

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("product_id", data.product_id);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("stock", data.stock);
        formData.append("category_id", data.category_id);

        if (data.image[0]) {
            formData.append("image", data.image[0]);
        }

        try {
            const response = await axios.post(
                "/api/products/update",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );
            console.log(response.data.message);
            setEditing(false);
            setEditingProduct(null);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.product_id === data.product_id
                        ? { ...product, ...data }
                        : product
                )
            );
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
    if (loading) return <Loading />;

    return (
        <>
            {!editing ? (
                <Box sx={{ padding: "20px" }}>
                    <Typography variant="h4" gutterBottom>
                        Update Page
                    </Typography>
                    {loading && <Typography>Loading products...</Typography>}
                    {error && <Typography color="error">{error}</Typography>}
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
                                        <strong>Price</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Stock</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Image</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Action</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.product_id}>
                                        <TableCell>
                                            {product.product_id}
                                        </TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell>
                                            <img
                                                src={`/images/${product.image_url}`}
                                                alt="Product"
                                                height={50}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() =>
                                                    handleShowButton(product)
                                                }
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        border: "solid 5px green",
                    }}
                >
                    <Paper
                        elevation={10}
                        sx={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            alignSelf: "center",
                            flexDirection: "column",
                            width: "400px",
                            padding: "16px 0",
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            letterSpacing="2px"
                        >
                            Edit Product
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                disabled
                                margin="dense"
                                label="Product ID"
                                variant="filled"
                                {...register("product_id", { required: true })}
                                error={!!errors.product_id}
                                helperText={
                                    errors.product_id
                                        ? "This field is required"
                                        : ""
                                }
                                fullWidth
                            />

                            <TextField
                                margin="dense"
                                label="Product Name"
                                variant="filled"
                                {...register("name", { required: true })}
                                error={!!errors.name}
                                helperText={
                                    errors.name ? "This field is required" : ""
                                }
                                fullWidth
                            />

                            <TextField
                                margin="dense"
                                label="Description"
                                variant="filled"
                                {...register("description", { required: true })}
                                error={!!errors.description}
                                helperText={
                                    errors.description
                                        ? "This field is required"
                                        : ""
                                }
                                fullWidth
                            />

                            <TextField
                                margin="dense"
                                label="Price"
                                variant="filled"
                                {...register("price", { required: true })}
                                error={!!errors.price}
                                helperText={
                                    errors.price ? "This field is required" : ""
                                }
                                fullWidth
                            />

                            <TextField
                                margin="dense"
                                label="Stock"
                                variant="filled"
                                {...register("stock", { required: true })}
                                error={!!errors.stock}
                                helperText={
                                    errors.stock ? "This field is required" : ""
                                }
                                fullWidth
                            />

                            <TextField
                                margin="dense"
                                label="Category ID"
                                variant="filled"
                                {...register("category_id", { required: true })}
                                error={!!errors.category_id}
                                helperText={
                                    errors.category_id
                                        ? "This field is required"
                                        : ""
                                }
                                fullWidth
                            />

                            <TextField
                                type="file"
                                accept="image/*"
                                {...register("image", { required: true })}
                                style={{ marginTop: "16px" }}
                                error={!!errors.image}
                            />

                            <Stack
                                margin="dense"
                                sx={{ margin: "10px" }}
                                justifyContent="center"
                                gap={2}
                            >
                                <Button variant="contained" type="submit">
                                    Update Product
                                </Button>
                                <Button
                                    onClick={handleCancel}
                                    variant="contained"
                                    type="submit"
                                >
                                    Cancel Update
                                </Button>
                            </Stack>
                        </form>
                    </Paper>
                </Box>
            )}
        </>
    );
}

export default UpdateProduct;
