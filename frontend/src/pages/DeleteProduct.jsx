// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Button,
//     Typography,
// } from "@mui/material";
// import Loading from "../components/Loading";

// function DeleteProduct() {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch the products from the backend using axios
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get("/api/products");
//                 setProducts(response.data);
//                 console.log(response.data);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//                 setError("Failed to load products.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     if (loading) return <Loading />;
//     if (error) return <p>{error}</p>;

//     const handleShowButton = async (id) => {
//         console.log(id);
//         try {
//             // Send the product_id to the backend via a POST request
//             const response = await axios.post(
//                 "/api/products/delete",
//                 { product_id: id }, // Pass data in the body as an object
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     withCredentials: true,
//                 }
//             );
//             console.log("Product deleted:", response.data);
//             setProducts((prevProducts) =>
//                 prevProducts.filter((product) => product.product_id !== id)
//             );
//         } catch (error) {
//             console.error("Error deleting product:", error);
//         }
//     };

//     return (
//         <section>
//             <Typography variant="h4" gutterBottom>
//                 Delete Page
//             </Typography>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>
//                                 <strong>Product ID</strong>
//                             </TableCell>
//                             <TableCell>
//                                 <strong>Name</strong>
//                             </TableCell>
//                             <TableCell>
//                                 <strong>Price (Rupees)</strong>
//                             </TableCell>
//                             <TableCell>
//                                 <strong>Image</strong>
//                             </TableCell>
//                             <TableCell>
//                                 <strong>Action</strong>
//                             </TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {products.map((product) => (
//                             <TableRow key={product.product_id}>
//                                 <TableCell>{product.product_id}</TableCell>
//                                 <TableCell>{product.name}</TableCell>
//                                 <TableCell>{product.price}</TableCell>
//                                 <TableCell>
//                                     <img
//                                         src={`/images/${product.image_url}`}
//                                         alt="no logo"
//                                         height={50}
//                                     />
//                                 </TableCell>
//                                 <TableCell>
//                                     <Button
//                                         variant="contained"
//                                         color="error"
//                                         onClick={() =>
//                                             handleShowButton(product.product_id)
//                                         }
//                                     >
//                                         Delete
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </section>
//     );
// }

// export default DeleteProduct;
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar,
    Alert,
    Avatar,
} from "@mui/material";
import Loading from "../components/Loading";

function DeleteProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setOpenDialog(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedProduct) return;
        try {
            const response = await axios.post(
                "/api/products/delete",
                { product_id: selectedProduct.product_id },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log("Product deleted:", response.data);
            setProducts((prev) =>
                prev.filter((p) => p.product_id !== selectedProduct.product_id)
            );
            setSnackbarMessage(`Product "${selectedProduct.name}" deleted successfully.`);
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error deleting product:", error);
        } finally {
            setOpenDialog(false);
            setSelectedProduct(null);
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setSelectedProduct(null);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    return (
        <section>
            <Typography variant="h5" gutterBottom>
                Delete Product
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>
                            <strong>Product ID</strong>
                         </TableCell>
                         <TableCell>
                            <strong>Name</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Price</strong>
                                </TableCell>
                            <TableCell>
                                <strong>Stock</strong>
                                </TableCell>
                            <TableCell>
                                <strong>Image</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Action</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.product_id}>
                                <TableCell>{product.product_id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                 <TableCell>
                                  <img
                                        src={`/images/${product.image_url}`}
                                      alt="no logo"
                                     height={50}
                                     />
                                 </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDeleteClick(product)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the product <strong>{selectedProduct?.name}</strong> (ID: <strong>{selectedProduct?.product_id}</strong>)?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button color="error" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar Notification */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </section>
    );
}

export default DeleteProduct;
