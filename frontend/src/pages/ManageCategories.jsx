import { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import Loading from "../components/Loading";
import AddCategoryDialog from "../components/AddCategoryDialog";

function ManageCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [editCategory, setEditCategory] = useState(null); // Stores category to edit
    const [updatedName, setUpdatedName] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");

    // Fetch categories from the backend using axios
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/api/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError("Failed to load categories.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    // Handle category deletion
    const handleDelete = async (category_id) => {
        console.log(Number(category_id));
        try {
            await axios.post("/api/delete-category", {
                category_id: Number(category_id),
            });
            setCategories((prevCategories) =>
                prevCategories.filter(
                    (category) => category.category_id !== category_id
                )
            );
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    // Handle showing the edit dialog
    const handleEdit = (category) => {
        setEditCategory(category);
        setUpdatedName(category.name);
        setUpdatedDescription(category.description);
    };

    // Handle updating a category
    const handleUpdate = async () => {
        try {
            await axios.post("/api/udate-category", {
                category_id: editCategory.category_id,
                name: updatedName,
                description: updatedDescription,
            });
            setCategories((prevCategories) =>
                prevCategories.map((cat) =>
                    cat.category_id === editCategory.category_id
                        ? {
                              ...cat,
                              name: updatedName,
                              description: updatedDescription,
                          }
                        : cat
                )
            );
            setEditCategory(null); // Close the dialog
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    //Add Category logiv

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleCategoryAdded = (newCategory) => {
        setCategories((prev) => [...prev, newCategory]);
    };

    return (
        <section>
            <Typography variant="h4" gutterBottom>
                Manage Categories
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>ID</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Name</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Description</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Actions</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.category_id}>
                                <TableCell>{category.category_id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell sx={{ maxWidth: "250px" }}>
                                    {category.description}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEdit(category)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                            handleDelete(category.category_id)
                                        }
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Dialog */}
            <Dialog
                open={Boolean(editCategory)}
                onClose={() => setEditCategory(null)}
            >
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditCategory(null)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUpdate}
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Button
                sx={{ marginTop: "10px" }}
                variant="contained"
                color="success"
                onClick={handleOpenDialog}
            >
                Add Category
            </Button>
            <AddCategoryDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onCategoryAdded={handleCategoryAdded}
            />
        </section>
    );
}

export default ManageCategories;
