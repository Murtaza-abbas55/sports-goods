import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function SaleForm({
    setFormDialogOpen,
    formDialogOpen,
    discount,
    setDiscount,
    selectedProductID,
    setSaleProducts,
    saleProducts,
    setSnackbar,
}) {
    function handleClose() {
        setFormDialogOpen(false);
    }

    const { Data } = useAuth();

    async function addSale(event) {
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const discountValue = parseInt(formJson.discount, 10);

        // Validate discount value
        if (isNaN(discountValue) || discountValue < 1 || discountValue > 100) {
            alert(
                "Please enter a valid discount percentage between 1 and 100."
            );
            return;
        }

        setDiscount(discountValue);
        console.log(discountValue);
        console.log(selectedProductID);
        handleClose();

        try {
            const response = await axios.post("/api/addsale", {
                product_id: selectedProductID,
                discount_percent: discountValue,
                admin_username: Data.admin_username,
            });
            console.log(response.data);
            setSaleProducts((prevSaleProducts) => [
                ...prevSaleProducts,
                {
                    product_id: selectedProductID,
                    discount_percent: discountValue,
                },
            ]);
            setSnackbar({
                open: true,
                message: "Product added to sale successfully!",
                severity: "success",
            });
        } catch (error) {
            console.error(
                "Error while adding product to cart:",
                error.response?.data || error.message
            );
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={formDialogOpen}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                        event.preventDefault();
                        addSale(event);
                    },
                }}
            >
                <DialogTitle>Sale Discount</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ width: "500px" }}>
                        Enter Discount Percentage
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="discount"
                        name="discount"
                        label="Discount"
                        type="number"
                        fullWidth
                        variant="standard"
                        inputProps={{
                            min: 1,
                            max: 100,
                            step: 1,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Confirm</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default SaleForm;
