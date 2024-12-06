import express from "express";
import { verifyAdmin } from "../middlewares/adminauth.js";
import { AddSaleController, RemoveSaleController,getSalesController } from "../controllers/SaleController.js";

const router = express.Router();

router.post("/addsale", verifyAdmin, AddSaleController);
router.post("/removesale", verifyAdmin, RemoveSaleController);
router.get('/sale',getSalesController);
export default router;
