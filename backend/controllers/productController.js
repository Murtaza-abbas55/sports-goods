// backend/controllers/productController.js
import { getAllProducts, createProduct,DeleteProduct,UpdateProduct,GetProductById } from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getProductById = async (req, res) => {
    const id = req.params.id; 
    try {
       const product = await GetProductById(id);
       res.json(product);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
    };
export const addProduct = async (req, res) => {
    try {
        const { body } = req;
     
        const sanitizedImageUrl = req.file ? req.file.filename : null;

        const productData = { 
            ...body, 
            image_url: sanitizedImageUrl,
            admin_username: req.adminUsername 
        };

        const newProduct = await createProduct(productData);
        res.status(200).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const  deleteProduct = async (req, res) => {
    try{
         const {product_id} = req.body;
         if (!product_id) {
            return res.status(400).json({ error: 'Product ID is required' });
        }
         const deletedProduct = await DeleteProduct(product_id);
         res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {

      const { body } = req;
        const sanitizedImageUrl = req.file ? req.file.filename : null;
        const productData = { 
            ...body, 
            image_url: sanitizedImageUrl,
            admin_username: req.adminUsername 
        };
        const UpdatedProduct = await UpdateProduct(productData);
        res.status(200).json({message:'Product updated succesfully',product:UpdatedProduct});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};