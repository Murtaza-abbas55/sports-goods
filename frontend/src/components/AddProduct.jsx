// import { useState } from "react";
// import axios from "axios";

// const AddProduct = () => {
//     const [product, setProduct] = useState({
//         product_id: "",
//         name: "",
//         description: "",
//         price: "",
//         stock: "",
//         category_id: "",
//         admin_username: null, // Set to null or can be assigned a value if needed
//     });

//     const handleChange = (e) => {
//         setProduct({ ...product, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("/api/products", product, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             console.log("Product added:", response.data); // Log the response from the backend
//         } catch (error) {
//             console.error("Error adding product:", error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 name="product_id"
//                 placeholder="Product ID"
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="text"
//                 name="name"
//                 placeholder="Product Name"
//                 onChange={handleChange}
//                 required
//             />
//             <textarea
//                 name="description"
//                 placeholder="Description"
//                 onChange={handleChange}
//                 required
//             ></textarea>
//             <input
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="number"
//                 name="stock"
//                 placeholder="Stock Quantity"
//                 onChange={handleChange}
//                 required
//             />
//             <input
//                 type="number"
//                 name="category_id"
//                 placeholder="Category ID"
//                 onChange={handleChange}
//                 required
//             />
//             <button type="submit">Add Product</button>
//         </form>
//     );
// };

// export default AddProduct;
import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState(null);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // FormData to include product details and image
        const formData = new FormData();
        formData.append('product_id', productId);
        formData.append('name', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('category_id', categoryId);
        if (image) formData.append('image', image); // Only append if image is selected

        try {
            const response = await axios.post('/api/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            console.log(response.data.message);  // Log success message
        } catch (error) {
            console.error('Error adding product:', error);
            if (error.response) {
                console.error('Response error:', error.response);
            } else if (error.request) {
                console.error('Request error:', error.request);
            } else {
                console.error('Axios error:', error.message);
            }
        }
    };

    return (
        <div>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product ID:</label>
                    <input
                        type="number"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Stock:</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Category ID:</label>
                    <input
                        type="number"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Product Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductForm;
