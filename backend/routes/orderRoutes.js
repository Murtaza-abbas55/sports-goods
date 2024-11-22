import express from 'express';
import { createOrderController,cancelOrderController,getOrderController,getUserOrdersController } from '../controllers/OrderController.js';


const router = express.Router();
router.post('/create',createOrderController);
router.post('/cancelorder',cancelOrderController);
router.get('/order',getOrderController);
router.get('/order-user',getUserOrdersController);
export default router;