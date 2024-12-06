
import { AddSale, RemoveSale,getSale } from "../models/Sale.js";
export const AddSaleController = async (req, res) => {
    const { product_id, discount_percent } = req.body;
    const admin_username = req.adminUsername;

    if (!product_id || !discount_percent || !admin_username) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        const newSale = await AddSale(discount_percent, product_id, admin_username);
        res.status(201).json({ success: true, sale: newSale, message: "Sale added successfully." });
    } catch (error) {
        console.error("Error adding sale:", error);
        res.status(500).json({ error: "Failed to add sale due to server error." });
    }
};

export const RemoveSaleController = async (req, res) => {
    const { product_id } = req.body;

    if (!product_id) {
        return res.status(400).json({ error: "Missing product_id." });
    }

    try {
        const deleteresult = await RemoveSale(product_id);
        if (deleteresult.rowCount === 0) {
            return res.status(404).json({ success: false, message: "Sale not found." });
        }
        res.status(200).json({ success: true, message: "Sale removed successfully." });
    } catch (error) {
        console.error("Error removing sale:", error);
        res.status(500).json({ error: "Failed to remove sale due to server error." });
    }
};

export const UpdateSaleController = async (req, res) => {
    const { product_id, newdiscount_percent } = req.body;
    const admin_username = req.adminUsername;

    if (!product_id || !newdiscount_percent || !admin_username) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        const updatedSale = await updateSaleById(newdiscount_percent, product_id, admin_username);
        if (!updatedSale) {
            return res.status(404).json({ error: "Sale not found." });
        }
        res.status(200).json({ message: "Sale updated", sale: updatedSale });
    } catch (error) {
        console.error("Error updating sale:", error);
        res.status(500).json({ error: "Failed to update sale due to server error." });
    }
};
export const getSalesController = async (req, res) => {
    try {
        const result = await getSale();

        if (result.success) {
            res.status(200).json({
                message: result.message,
                sales: result.sales,
            });
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        console.error("Error in getSalesController:", error.message);
        res.status(500).json({
            message: "An error occurred while fetching sales.",
            error: error.message,
        });
    }
};
