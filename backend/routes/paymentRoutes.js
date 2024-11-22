import { createPaymentController,getPaymentByOrderController } from "../controllers/PaymentController.js";
import express from "express";

const router = express.Router();

router.post('/payment',createPaymentController);
router.get('/getpayment',getPaymentByOrderController);

export default router;