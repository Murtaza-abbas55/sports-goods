import React, { useState } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { createPayment } from "../services/payment";
import { cancelOrder } from "../services/order";
import { useNavigate } from "react-router-dom";

function PaymentForm({ order_id }) {
    const [loading, setLoading] = useState(false);
    console.log("payment order" + order_id);
    const [formData, setFormData] = useState({
        payment_method: "",
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log("Form Data Submitted:", formData);

        try {
            await createPayment(order_id, formData.payment_method);
            console.log("Payment created successfully");
            setDialogOpen(true); // Open the dialog after successful payment
        } catch (error) {
            console.error("Error creating payment:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        setLoading(true);

        try {
            await cancelOrder(order_id);
            console.log("Order Cancelled successfully");
            navigate("/");
        } catch (error) {
            console.error("Error cancelling payment:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        navigate("/"); // Redirect to homepage after closing dialog
    };

    return (
        <>
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
                        Payment Form
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
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Submit Payment"
                        )}
                    </Button>
                    <Button
                        onClick={handleCancel}
                        variant="contained"
                        color="error"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Cancel Order"
                        )}
                    </Button>
                </Box>
            </Container>

            {/* Confirmation Dialog */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                    }}
                >
                    <CheckCircleOutlineIcon
                        fontSize="large"
                        sx={{ color: "green" }}
                    />
                    Payment Successful
                </DialogTitle>
                <DialogContent>
                    <Typography
                        variant="body1"
                        textAlign="center"
                        sx={{ fontSize: "18px", marginY: 2 }}
                    >
                        Your payment has been processed successfully. Thank you!
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: "center",
                        paddingBottom: 2,
                    }}
                >
                    <Button
                        onClick={handleDialogClose}
                        variant="contained"
                        color="primary"
                        sx={{
                            paddingX: 4,
                            textTransform: "none",
                        }}
                    >
                        Go to Home
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PaymentForm;
