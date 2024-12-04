import express from 'express';
import { createOrderController,cancelOrderController,getOrderController,getUserOrdersController,getAdminAssociatedOrdersController,Updateorderstatuscontroller} from '../controllers/OrderController.js';
import { verifyAdmin } from '../middlewares/adminauth.js';

const router = express.Router();
router.post('/create',createOrderController);
router.post('/cancelorder',cancelOrderController);
router.get('/order',getOrderController);
router.get('/user',getUserOrdersController);
router.get('/admin',getAdminAssociatedOrdersController);
router.post('/updatestatus',verifyAdmin,Updateorderstatuscontroller);
export default router;