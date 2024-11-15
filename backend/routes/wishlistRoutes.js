import express from 'express';
import { addToWishlistController, removeFromWishlistController, updateWishlistNameController, getAllWishlistItemsController } from '../controllers/WishlistController.js';
import { verifyUser } from '../middlewares/userauth.js';
const router = express.Router();
router.post('/addwishlist',verifyUser, addToWishlistController);
router.post('/removewishlist',verifyUser, removeFromWishlistController);
router.post('/updatewishlist',verifyUser, updateWishlistNameController);
router.get('/getallwishlist',verifyUser, getAllWishlistItemsController);

export default router;
