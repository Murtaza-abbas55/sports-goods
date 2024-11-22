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
}) {
    function handleClose() {
        setFormDialogOpen(false);
    }

    const { Data } = useAuth();

    async function addSale(event) {
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        setDiscount(formJson.discount);
        console.log(formJson.discount);
        console.log(selectedProductID);
        handleClose();

        try {
            const response = await axios.post("/api/addsale", {
                product_id: selectedProductID,
                discount_percent: formJson.discount,
                admin_username: Data.admin_username,
            });
            console.log(response.data);
            setSaleProducts((prevSaleProducts) => [
                ...prevSaleProducts,
                {
                    product_id: selectedProductID,
                    discount_percent: formJson.discount,
                },
            ]);
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
                        id="name"
                        name="discount"
                        label="Discount"
                        type="number"
                        fullWidth
                        variant="standard"
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
