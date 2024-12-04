import { AllCategories,ProductsByCategory,addCategoryController,updateCategoryController,deleteCategoryController } from "../controllers/CategoriesController.js";
import express from "express";
import {verifyAdmin} from "../middlewares/adminauth.js";
const router= express.Router();

router.get('/categories',AllCategories);
router.get('/category-products/:id',ProductsByCategory);
router.post('/add-category',verifyAdmin,addCategoryController);
router.post('/udate-category',verifyAdmin,updateCategoryController);
router.post('/delete-category',verifyAdmin,deleteCategoryController);
export default router;