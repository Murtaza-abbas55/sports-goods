import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({
    product_id: '',
    product_name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category_id: ''
  });

  // Fetch products from the backend
  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/products', productDetails)
      .then(response => {
        // Add the new product to the list of products
        setProducts([...products, response.data]);
        // Clear the form fields
        setProductDetails({
          product_id: '',
          product_name: '',
          description: '',
          price: '',
          stock_quantity: '',
          category_id: ''
        });
      })
      .catch(error => {
        console.error("There was an error adding the product!", error);
      });
  };

  return (
    <div className="container">
      <h1>Product Management</h1>

      {/* Form to add a new product */}
      <form onSubmit={handleSubmit}>
        <label>
          Product ID:
          <input
            type="number"
            name="product_id"
            value={productDetails.product_id}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Product Name:
          <input
            type="text"
            name="product_name"
            value={productDetails.product_name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={productDetails.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={productDetails.price}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Stock Quantity:
          <input
            type="number"
            name="stock_quantity"
            value={productDetails.stock_quantity}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Category ID:
          <input
            type="number"
            name="category_id"
            value={productDetails.category_id}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add Product</button>
      </form>

      {/* Display products in a table */}
      <h2>Products List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Category ID</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>{product.product_name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock_quantity}</td>
              <td>{product.category_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
