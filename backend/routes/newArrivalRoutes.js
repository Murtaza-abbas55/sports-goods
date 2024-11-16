import express from "express";
import { getNewArrivalProductsController } from "../controllers/NewArrivalController.js";

const router = express.Router();

// GET /new-arrivals
router.get("/new-arrivals", getNewArrivalProductsController);

export default router;
