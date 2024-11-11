// server/routes/productRoutes.js
import express from 'express';
import { getProducts, addProduct,deleteProduct,updateProduct} from '../controllers/productController.js';
import { verifyAdmin } from '../middlewares/adminauth.js'
const router = express.Router();

router.get('/', getProducts);
router.post('/',verifyAdmin, addProduct);
router.delete('/delete',verifyAdmin, deleteProduct);
router.put('/update',verifyAdmin, updateProduct);
export default router;