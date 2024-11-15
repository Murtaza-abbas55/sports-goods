import { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";

function UpdateProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

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

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const handleShowButton = (product) => {
        setEditing(true);
        setEditingProduct(product);

        // Set form fields to selected product's data
        setValue("product_id", product.product_id);
        setValue("name", product.name);
        setValue("description", product.description);
        setValue("price", product.price);
        setValue("stock", product.stock);
        setValue("category_id", product.category_id);
    };

    // const onSubmit = (data) => {
    //     console.log("Updated Product Data:", data);
    //     setEditing(null);
    //     setEditingProduct(null);
    // };

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/products/update", data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
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
            if (error.response) {
                console.error("Response error:", error.response.data);
            }
        }
    };

    return (
        <>
            {!editing ? (
                <section style={{ display: "flex" }}>
                    <h1>Update Page</h1>
                    {products.map((product) => (
                        <div
                            style={{
                                height: "250px",
                                width: "250px",
                                border: "solid 3px blue",
                                margin: "1rem",
                            }}
                            key={product.product_id}
                        >
                            <p>Product Number: {product.product_id}</p>
                            <p>{product.name}</p>
                            <img
                                src={`/images/${product.image_url}`}
                                alt="Product"
                                height={50}
                            />
                            <button onClick={() => handleShowButton(product)}>
                                Edit
                            </button>
                        </div>
                    ))}
                </section>
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

                            <Stack
                                margin="dense"
                                sx={{ margin: "10px" }}
                                justifyContent="center"
                                gap={2}
                            >
                                <Button variant="contained" type="submit">
                                    Update Product
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
