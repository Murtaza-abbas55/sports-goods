import { AllCategories,ProductsByCategory,addCategoryController,updateCategoryController } from "../controllers/CategoriesController.js";
import express from "express";
import verifyAdmin from "../middleware/verifyAdmin.js";
const router= express.Router();

router.get('/categories',AllCategories);
router.get('/category-products/:id',ProductsByCategory);
router.post('/add-category',verifyAdmin,addCategoryController);
router.post('/udate-category',verifyAdmin,updateCategoryController);
export default router;