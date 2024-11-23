import { getProductsByMostPopular,getProductsByPriceHighToLow,getProductsByPriceLowToHigh } 
from "../controllers/FilterProductController.js";
import express from "express"

const router = express.Router();

router.get('/sort/price-low-to-high', getProductsByPriceLowToHigh);
router.get('/sort/price-high-to-low', getProductsByPriceHighToLow);
router.get('/sort/most-popular', getProductsByMostPopular);

export default router;