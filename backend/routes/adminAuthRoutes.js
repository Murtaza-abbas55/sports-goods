
import express from 'express';
import { adminSignup, adminLogin } from '../controllers/adminAuthController.js';
import { validateAdminSignup, validateAdminLogin } from '../middlewares/adminvalidation.js';

const router = express.Router();

router.post('/admin/signup', validateAdminSignup, adminSignup);
router.post('/admin/login', validateAdminLogin, adminLogin);

export default router;
