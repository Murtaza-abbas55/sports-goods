import { refreshTrendingProducts, fetchTrendingProducts } from "../models/Trending.js";

export const getTrendingProducts = async (req, res) => {
    try {
        const refreshedres= await refreshTrendingProducts();
        if (!refreshedres.success) {
            return res.status(500).json({ message: refreshedres.message });
        }
        const Result = await fetchTrendingProducts();
        if (Result.success) {
            res.status(200).json(Result.products);
        } else {
            res.status(500).json({ message: Result.message });
        }
    } catch (error) {
        console.error("Error in getTrendingProducts:", error);
        res.status(500).json({ message: "An error occurred while fetching trending products.", error });
    }
};
