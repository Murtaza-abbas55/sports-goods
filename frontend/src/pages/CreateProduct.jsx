import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function CreateProduct() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            const response = await axios.post("/api/products", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            console.log(response.data.message); // Log success message
        } catch (error) {
            console.error("Error adding product:", error);
            if (error.response) {
                console.error("Response error:", error.response);
            } else if (error.request) {
                console.error("Request error:", error.request);
            } else {
                console.error("Axios error:", error.message);
            }
        }
    };

    return (
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
                    fontWeight={"bold"}
                    letterSpacing={"2px"}
                >
                    Add Product
                </Typography>
                <form style={{}} onSubmit={handleSubmit(onSubmit)}>
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                        size="large"
                        fullWidth
                    />

                    <Stack
                        margin="dense"
                        sx={{ margin: "10px" }}
                        justifyContent={"center"}
                        gap={2}
                    >
                        <Button variant="contained" type="submit">
                            Add Product
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
export default CreateProduct;
