import express from "express";
import { verifyAdmin } from "../middlewares/adminauth.js";
import { AddSaleController, RemoveSaleController, UpdateSaleController } from "../controllers/SaleController.js";

const router = express.Router();

router.post("/addsale", verifyAdmin, AddSaleController);
router.post("/removesale", verifyAdmin, RemoveSaleController);
router.post("/updatesale", verifyAdmin, UpdateSaleController);

export default router;
