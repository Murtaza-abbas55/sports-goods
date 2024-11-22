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
} from "@mui/material";
import Loading from "../components/Loading";
import SaleForm from "../components/SaleForm";
import useFetchSale from "../hooks/useFetchSale";

function Sale() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [selectedProductID, setSelectedProductID] = useState(null);

    const { saleProducts, setSaleProducts } = useFetchSale();
    console.log("saleProducts");
    console.log(saleProducts);

    // Fetch the products from the backend using axios
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products");
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    function handleOpenFormDialog(product_id) {
        setSelectedProductID(product_id);
        setFormDialogOpen(true);
    }

    function getProductSaleStatus(product_id) {
        return saleProducts.some(
            (product) => product.product_id === product_id
        );
    }

    async function handleRemoveSale(product_id) {
        console.log(product_id);
        try {
            const response = await axios.post("/api/removesale", {
                product_id,
            });
            setSaleProducts((prevSaleProducts) =>
                prevSaleProducts.filter(
                    (product) => product.product_id !== product_id
                )
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            console.log("finally");
        }
    }

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Sale</h1>

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
                                <strong>Add</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Remove</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.product_id}>
                                <TableCell>{product.product_id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    <img
                                        src={`/images/${product.image_url}`}
                                        alt="Product"
                                        height={50}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handleOpenFormDialog(
                                                product.product_id
                                            )
                                        }
                                        variant="contained"
                                        color="primary"
                                    >
                                        add sale
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        disabled={
                                            !getProductSaleStatus(
                                                product.product_id
                                            )
                                        }
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                            handleRemoveSale(product.product_id)
                                        }
                                    >
                                        remove sale
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <SaleForm
                formDialogOpen={formDialogOpen}
                setFormDialogOpen={setFormDialogOpen}
                discount={discount}
                setDiscount={setDiscount}
                selectedProductID={selectedProductID}
                setSaleProducts={setSaleProducts}
                saleProducts={saleProducts}
            />
        </div>
    );
}
export default Sale;
