import express from 'express';
import { signup, login,updateUserController,getAllUserDetailsController } from '../controllers/userAuthController.js';
import { validateSignup, validateLogin } from '../middlewares/uservalidation.js';
import { verifyUser } from '../middlewares/userauth.js';
const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/update',verifyUser,updateUserController);
router.get('/userdetails',verifyUser,getAllUserDetailsController);
export default router;
