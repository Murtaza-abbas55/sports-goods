import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url'; 
import { getProducts, addProduct, deleteProduct, updateProduct } from '../controllers/productController.js';
import { verifyAdmin } from '../middlewares/adminauth.js';

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../frontend/public/images')); 
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_'); 
        cb(null, originalName); 
    }
});
const upload = multer({ storage });


router.get('/', getProducts);
router.post('/',verifyAdmin, upload.single('image'), addProduct); 
router.delete('/delete', verifyAdmin, deleteProduct);
router.put('/update', verifyAdmin, updateProduct);

export default router;
