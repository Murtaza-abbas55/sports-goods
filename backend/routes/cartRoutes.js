import express from 'express';
import {
    addToCart,
    removeFromCart,
    clearCart,
    mergeAnonymousCart,
    getCartProductsController,
    clearUserCart,
    ChangeQuantityController
} from '../controllers/CartController.js';

const router = express.Router();
router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.post('/clear', clearCart);
router.post('/merge', mergeAnonymousCart);
router.get('/getcart',getCartProductsController);
router.post('/clearusercart',clearUserCart);
router.post('/change-quantity',ChangeQuantityController);
export default router;
