import express from 'express';
import { createOrderController } from '../controllers/OrderController.js';


const router = express.Router();
router.post('/create',createOrderController);

export default router;