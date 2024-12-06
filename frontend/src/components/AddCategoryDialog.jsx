import { useState } from "react";
import axios from "axios";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Alert,
} from "@mui/material";

function AddCategoryDialog({ open, onClose, onCategoryAdded }) {
    const [category_id, setCategoryId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleAddCategory = async () => {
        try {
            const response = await axios.post("/api/add-category", {
                category_id,
                name,
                description,
            });
            setSuccess("Category added successfully!");
            setError(null);
            setCategoryId("");
            setName("");
            setDescription("");
            console.log("Category added:", response.data);

            onCategoryAdded(response.data.category);

            onClose();
        } catch (error) {
            console.error("Error adding category:", error);
            setSuccess(null);
            setError("Failed to add category. Please try again.");
        }
    };

    const handleClose = () => {
        setCategoryId("");
        setName("");
        setDescription("");
        setError(null);
        setSuccess(null);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent>
                {success && (
                    <Alert severity="success" sx={{ marginBottom: 2 }}>
                        {success}
                    </Alert>
                )}
                {error && (
                    <Alert severity="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="Category ID"
                        variant="outlined"
                        value={category_id}
                        onChange={(e) => setCategoryId(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={3}
                        required
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    onClick={handleAddCategory}
                    color="primary"
                    variant="contained"
                >
                    Add Category
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddCategoryDialog;
