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
import { useNavigate } from "react-router-dom";

function CheckoutForm({
    user_id,
    total_amount,
    checkoutTurn,
    setCheckoutTurn,
    order_id,
    setOrderID,
}) {
    const navigate = useNavigate();
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
            //  will execute after createOrder
        } catch (error) {
            console.error("Error creating order:", error);
            // for errors/validation
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
                    boxShadow: 5,
                }}
            >
                <Typography
                    fontWeight={"bold"}
                    variant="h5"
                    textAlign="center"
                    gutterBottom
                >
                    Shipping Address
                </Typography>

                <TextField
                    label="Shipping Address"
                    name="shipping_address"
                    variant="outlined"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    fullWidth
                    required
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
                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    disabled={loading}
                    onClick={() => navigate(-1)}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        "Cancel"
                    )}
                </Button>
            </Box>
        </Container>
    );
}

export default CheckoutForm;
