import express from 'express';
import { logout } from '../controllers/logoutController.js';
import { verifyToken } from '../middlewares/tokenverify.js';
const router = express.Router();

router.post('/logout',verifyToken,logout);

export default router;
