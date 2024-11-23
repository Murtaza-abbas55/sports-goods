import { getProductsSortedByPriceLowToHigh,getProductsSortedByPriceHighToLow,getProductsSortedByMostPopular } from "../models/filterProducts.js";
export const getProductsByPriceLowToHigh = async (req, res) => {
    try {
      const { category_id } = req.query;
      const products = await getProductsSortedByPriceLowToHigh(category_id);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getProductsByPriceHighToLow = async (req, res) => {
    try {
      const { category_id } = req.query;
      const products = await getProductsSortedByPriceHighToLow(category_id);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getProductsByMostPopular = async (req, res) => {
    try {
      const { category_id } = req.query;
      const products = await getProductsSortedByMostPopular(category_id);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };