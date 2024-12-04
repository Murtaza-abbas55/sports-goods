import React, { useState } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    CircularProgress,
} from "@mui/material";
import { createOrder } from "../services/order";

function CheckoutForm({
    user_id,
    total_amount,
    checkoutTurn,
    setCheckoutTurn,
    order_id,
    setOrderID,
}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        shipping_address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        setLoading(true);
        try {
            await createOrder(
                user_id,
                formData.shipping_address,
                total_amount,
                setOrderID,
                setCheckoutTurn,
                checkoutTurn
            );
            console.log("Order created successfully");
            // This will execute after createOrder completes
        } catch (error) {
            console.error("Error creating order:", error);
            // Handle error (e.g., show an error message to the user)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 4,
                    p: 3,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                }}
            >
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Simple Material-UI Form
                </Typography>
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Shipping Address"
                    name="shipping_address"
                    variant="outlined"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        "Submit"
                    )}
                </Button>
            </Box>
        </Container>
    );
}

export default CheckoutForm;
