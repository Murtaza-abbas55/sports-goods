import { getAllCategories,getProductsByCategoryId } from "../models/Categories.js";

export const AllCategories = async (req,res)=>{
   try{
    const categories = await getAllCategories();
    res.status(200).json(categories);
   }
   catch(err){
    res.status(500).json({ error: err.message });
   }
};

export const ProductsByCategory = async (req, res) => {
    const category_id = req.params.id;
    try {
      const products = await getProductsByCategoryId(category_id);
      res.status(200).json(products);
    }
    catch(err) {
     res.status(500).json({ error: err.message });
    }
};