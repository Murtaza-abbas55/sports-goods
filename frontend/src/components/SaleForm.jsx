import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function SaleForm({
    setFormDialogOpen,
    formDialogOpen,
    discount,
    setDiscount,
    selectedProductID,
}) {
    function handleClose() {
        setFormDialogOpen(false);
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
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        setDiscount(formJson.discount);
                        console.log(formJson.discount);
                        console.log(selectedProductID);
                        handleClose();
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
