import { addToWishlist, removeFromWishlist, updateWishlistName, getAllWishlistItems } from '../models/Wishlist.js';

export const addToWishlistController = async (req, res) => {
    const { product_id, wishlist_name } = req.body;
    const user_id = req.userId;
    try {
        if (!user_id || !product_id || !wishlist_name) {
            return res.status(400).json({ error: 'User ID, Product ID, and Wishlist Name are required.' });
        }

        const addedItem = await addToWishlist(user_id, product_id, wishlist_name);

        if (addedItem) {
            return res.status(201).json({
                message: 'Product added to wishlist',
                wishlistItem: addedItem
            });
        } else {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }
    } catch (error) {
        console.error('Error in addToWishlistController:', error);
        return res.status(500).json({ error: 'Failed to add product to wishlist' });
    }
};
export const removeFromWishlistController = async (req, res) => {
    const { product_id } = req.body;
    const user_id = req.userId;
    try {
        if (!user_id || !product_id) {
            return res.status(400).json({ error: 'User ID and Product ID are required.' });
        }

        const removedItem = await removeFromWishlist(user_id, product_id);

        if (removedItem) {
            return res.status(200).json({
                message: 'Product removed from wishlist',
                wishlistItem: removedItem
            });
        } else {
            return res.status(404).json({ message: 'Product not found in wishlist' });
        }
    } catch (error) {
        console.error('Error in removeFromWishlistController:', error);
        return res.status(500).json({ error: 'Failed to remove product from wishlist' });
    }
};

export const updateWishlistNameController = async (req, res) => {
    const {  product_id, new_wishlist_name } = req.body;
    const user_id = req.userId;
    try {
        if (!user_id || !product_id || !new_wishlist_name) {
            return res.status(400).json({ error: 'User ID, Product ID, and New Wishlist Name are required.' });
        }

        const updatedItem = await updateWishlistName(user_id, product_id, new_wishlist_name);

        if (updatedItem) {
            return res.status(200).json({
                message: 'Wishlist name updated',
                wishlistItem: updatedItem
            });
        } else {
            return res.status(404).json({ message: 'Product not found in wishlist' });
        }
    } catch (error) {
        console.error('Error in updateWishlistNameController:', error);
        return res.status(500).json({ error: 'Failed to update wishlist name' });
    }
};
export const getAllWishlistItemsController = async (req, res) => {
    const  user_id =req.userId;

    try {
        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const wishlistItems = await getAllWishlistItems(user_id);

        return res.status(200).json({
            message: 'Fetched all wishlist items',
            wishlistItems: wishlistItems
        });
    } catch (error) {
        console.error('Error in getAllWishlistItemsController:', error);
        return res.status(500).json({ error: 'Failed to fetch wishlist items' });
    }
};
