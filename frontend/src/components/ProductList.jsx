// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Typography,
//     Box,
// } from "@mui/material";
// import Loading from "./Loading";

// const ProductList = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const { Data } = useAuth(); // Access Data instead of user

    
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
//     if (error) return <Typography color="error">{error}</Typography>;

//     return (
//         <Box padding={3}>
//             <Typography variant="h4" gutterBottom>
//                 Product Items
//             </Typography>

//             {products.length > 0 ? (
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>
//                                     <strong>Product ID</strong>
//                                 </TableCell>
//                                 <TableCell>
//                                     <strong>Name</strong>
//                                 </TableCell>
//                                 <TableCell>
//                                     <strong>Category ID</strong>
//                                 </TableCell>
//                                 <TableCell>
//                                     <strong>Description</strong>
//                                 </TableCell>
//                                 <TableCell>
//                                     <strong>Price</strong>
//                                 </TableCell>
//                                 <TableCell>
//                                     <strong>Stock</strong>
//                                 </TableCell>
//                                 <TableCell>
//                                     <strong>Image</strong>
//                                 </TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {products.map((product) => (
//                                 <TableRow key={product.product_id}>
//                                     <TableCell>{product.product_id}</TableCell>
//                                     <TableCell>{product.name}</TableCell>
//                                     <TableCell>{product.category_id}</TableCell>
//                                     <TableCell
//                                         align="justify"
//                                         sx={{ maxWidth: "250px" }}
//                                     >
//                                         {product.description}
//                                     </TableCell>
//                                     <TableCell>{product.price}</TableCell>
//                                     <TableCell>{product.stock}</TableCell>
//                                     <TableCell>
//                                         <img
//                                             src={`/images/${product.image_url}`}
//                                             alt="Product"
//                                             style={{
//                                                 width: "75px",
//                                                 height: "75px",
//                                                 objectFit: "cover",
//                                             }}
//                                         />
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             ) : (
//                 <Typography>No products available.</Typography>
//             )}
//             <Box mt={3}>
//                 <Link to="/admin" style={{ textDecoration: "none" }}>
//                     <Typography variant="button" color="primary">
//                         Home
//                     </Typography>
//                 </Link>
//             </Box>
//         </Box>
//     );
// };

// export default ProductList;
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from "@mui/material";
import Loading from "./Loading";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { Data } = useAuth();

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

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} color="gold" />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} color="gold" />);
            } else {
                stars.push(<FaRegStar key={i} color="gold" />);
            }
        }
        return stars;
    };

    if (loading) return <Loading />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box padding={3}>
            <Typography variant="h4" gutterBottom>
                Product Items
            </Typography>

            {products.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Product ID</strong></TableCell>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Category ID</strong></TableCell>
                                <TableCell><strong>Description</strong></TableCell>
                                <TableCell><strong>Price</strong></TableCell>
                                <TableCell><strong>Stock</strong></TableCell>
                                <TableCell><strong>Rating</strong></TableCell>
                                <TableCell><strong>Image</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.product_id}>
                                    <TableCell>{product.product_id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.category_id}</TableCell>
                                    <TableCell sx={{ maxWidth: "250px" }} align="justify">
                                        {product.description}
                                    </TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            {renderStars(parseFloat(product.average_rating))}
                                            <Typography variant="body2" ml={1}>
                                                ({product.review_count})
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <img
                                            src={`/images/${product.image_url}`}
                                            alt={product.name}
                                            style={{
                                                width: "75px",
                                                height: "75px",
                                                objectFit: "cover",
                                                borderRadius: "8px"
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography>No products found.</Typography>
            )}

<Box mt={3}>
  <Link to="/admin" style={{ textDecoration: "none" }}>
    <Typography
      variant="button"
      color="primary"
      sx={{
        fontWeight: 'bold',
        fontSize: '1rem',
        padding: '8px 16px',
        border: '1px solid #1976d2',
        borderRadius: '8px',
        backgroundColor: '#e3f2fd',
        '&:hover': {
          backgroundColor: '#bbdefb',
        },
        display: 'inline-block',
        transition: 'background-color 0.3s ease',
      }}
    >
      Home
    </Typography>
  </Link>
</Box>

        </Box>
    );
};

export default ProductList;
