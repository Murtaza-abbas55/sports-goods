import { AllCategories,ProductsByCategory } from "../controllers/CategoriesController.js";
import express from "express";
const router= express.Router();

router.get('/categories',AllCategories);
router.get('/category-products/:id',ProductsByCategory);

export default router;