import express from 'express';
import { signup, login } from '../controllers/userAuthController.js';
import { validateSignup, validateLogin } from '../middlewares/uservalidation.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

export default router;
