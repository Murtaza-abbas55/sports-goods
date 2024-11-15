import { addReview, deleteReview,getAllGivenReviews } from "../models/Review.js";


export const AddReviewController = async (req, res) => {
    const { product_id, rating, comments } = req.body;
    const user_id = req.userId;
    try {
        const newReview = await addReview(user_id, product_id, rating, comments);
        res.status(201).json({ success: true, review: newReview, message: "Review added successfully." });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const DeleteReviewController = async (req, res) => {
    const {product_id } = req.body;
    const user_id = req.userId;
    try {
        const result = await deleteReview(user_id, product_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const GetReviewController = async (req, res) => {
    const user_id = req.userId; 

    try {
        const reviews = await getAllGivenReviews(user_id); 
        res.status(200).json({
            success: true,
            reviews,
            message: "Fetched all reviews given by the user.",
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message,
        });
    }
};

