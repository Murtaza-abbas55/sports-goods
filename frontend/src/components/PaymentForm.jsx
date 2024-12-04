import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { createPayment } from "../services/payment";
import { cancelOrder } from "../services/order";
import { useNavigate } from "react-router-dom";

function PaymentForm({ order_id }) {
    console.log("payment order" + order_id);
    const [formData, setFormData] = useState({
        payment_method: "",
    });
    const navigate = useNavigate();

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

        try {
            await createPayment(order_id, formData.payment_method);
            console.log("Payment created successfully");
        } catch (error) {
            console.error("Error creating payment:", error);
            // Handle error (e.g., show an error message to the user)
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
                    label="Payment Method"
                    name="payment_method"
                    variant="outlined"
                    value={formData.payment_method}
                    onChange={handleChange}
                    fullWidth
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    onClick={() => cancelOrder(order_id)}
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Cancel Order
                </Button>
            </Box>
        </Container>
    );
}
export default PaymentForm;
