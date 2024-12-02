import { getAllCategories,getProductsByCategoryId,insertCategory,updateCategory } from "../models/Categories.js";

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
export const addCategoryController = async (req, res) => {
  try {
    const { category_id, name, description } = req.body;

    if (!category_id || !name || !description) {
      return res.status(400).json({ message: "All fields are required: category_id, name, description" });
    }

    const newCategory = await insertCategory(category_id, name, description );
    res.status(201).json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    console.error("Error in addCategoryController:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const {category_id, name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Both name and description are required for update" });
    }

    const updatedCategory = await updateCategory(category_id, name, description );
    res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    console.error("Error in updateCategoryController:", error.message);
    res.status(500).json({ message: error.message });
  }
};