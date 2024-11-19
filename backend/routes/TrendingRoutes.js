import express from "express";
import { getTrendingProducts } from "../controllers/TrendingController.js";

const router = express.Router();
router.get("/trending-products", getTrendingProducts);

export default router;
