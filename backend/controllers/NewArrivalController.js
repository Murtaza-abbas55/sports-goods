import { getNewArrivalProducts } from "../models/NewArrival.js";

export const getNewArrivalProductsController = async (req, res) => {
    try {
        const products = await getNewArrivalProducts();
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error("Error fetching new arrival products:", error);
        res.status(500).json({ success: false, error: "Failed to fetch new arrival products." });
    }
};
