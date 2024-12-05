import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, Snackbar, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useState } from "react";
import { CircularProgress, Alert } from "@mui/material";

function CreateProduct() {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // Create FormData object for file upload
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");
        const formData = new FormData();

        // Append each form field to FormData
        formData.append("product_id", data.product_id);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("stock", data.stock);
        formData.append("category_id", data.category_id);

        // Append file - data.image[0] is the actual file
        if (data.image[0]) {
            formData.append("image", data.image[0]);
        }

        try {
            const response = await axios.post("/api/products", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            console.log(response.data.message); // Log success message
            setSuccessMessage("Product added successfully!");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error adding product:", error);
            if (error.response) {
                console.error("Response error:", error.response);
            } else if (error.request) {
                console.error("Request error:", error.request);
            } else {
                console.error("Axios error:", error.message);
            }
            setErrorMessage("Failed to add product. Please try again.");
            setSnackbarOpen(true);
        }
        setLoading(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                border: "solid 5px green",
            }}
        >
            <Snackbar
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                {successMessage ? (
                    <Alert onClose={handleSnackbarClose} severity="success">
                        {successMessage}
                    </Alert>
                ) : (
                    <Alert onClose={handleSnackbarClose} severity="error">
                        {errorMessage}
                    </Alert>
                )}
            </Snackbar>
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
                    fontWeight={"bold"}
                    letterSpacing={"2px"}
                >
                    Add Product
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="dense"
                        label="Product ID"
                        variant="filled"
                        placeholder="integer"
                        {...register("product_id", { required: true })}
                        error={!!errors.product_id}
                        helperText={
                            errors.product_id ? "This field is required" : ""
                        }
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="Product Name"
                        variant="filled"
                        placeholder="e.g Bat"
                        {...register("name", { required: true })}
                        error={!!errors.name}
                        helperText={errors.name ? "This field is required" : ""}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="Description"
                        variant="filled"
                        placeholder="Details about the product"
                        {...register("description", { required: true })}
                        error={!!errors.description}
                        helperText={
                            errors.description ? "This field is required" : ""
                        }
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="Price"
                        variant="filled"
                        placeholder="2000"
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
                        placeholder="Integer"
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
                        placeholder="Integer"
                        {...register("category_id", { required: true })}
                        error={!!errors.category_id}
                        helperText={
                            errors.category_id ? "This field is required" : ""
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
                    {/* {errors.image && (
                        <Typography color="error">
                            This field is required
                        </Typography>
                    )} */}

                    <Stack
                        margin="dense"
                        sx={{ margin: "10px" }}
                        justifyContent={"center"}
                        gap={2}
                    >
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <Box display="flex" alignItems="center" gap={1}>
                                    <CircularProgress
                                        size={20}
                                        color="inherit"
                                    />
                                    Adding...
                                </Box>
                            ) : (
                                "Add Product"
                            )}
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}

export default CreateProduct;
