import express from 'express';
import {
    addToCart,
    removeFromCart,
    clearCart,
    mergeAnonymousCart
} from '../controllers/CartController.js';

const router = express.Router();
router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.post('/clear', clearCart);
router.post('/merge', mergeAnonymousCart);

export default router;
