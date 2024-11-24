import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

function AddToCart({
    product_id,
    cartID,
    quantity,
    setQuantity,
    stock,
    style,
    handleAddToCart,
}) {
    const [loadingAddToCart, setLoadingAddToCart] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    return (
        <>
            {stock > 0 ? (
                <Button
                    sx={style}
                    size="large"
                    variant="outlined"
                    onClick={() =>
                        handleAddToCart(
                            product_id,
                            quantity,
                            setQuantity,
                            setLoadingAddToCart,
                            setToastMessage,
                            setToastOpen
                        )
                    }
                    disabled={loadingAddToCart}
                >
                    {loadingAddToCart ? (
                        <CircularProgress size={20} />
                    ) : (
                        "Add to Cart"
                    )}
                </Button>
            ) : (
                <Button sx={style} variant="contained" disabled>
                    Out of Stock
                </Button>
            )}
            <Snackbar
                open={toastOpen}
                autoHideDuration={3000}
                onClose={handleCloseToast}
                message={toastMessage}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseToast}
                    severity={"success"}
                    sx={{ width: "100%" }}
                >
                    {toastMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
export default AddToCart;
