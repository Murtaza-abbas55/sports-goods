import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function ReviewForm({
    formDialogOpen,
    setFormDialogOpen,
    product_id,
    reviews,
    setReviews,
}) {
    const [comments, setComments] = useState("");
    const [rating, setRating] = useState(null); // Tracks the rating
    const [ratingError, setRatingError] = useState(false); // Tracks if rating is missing
    const maxLength = 200;
    const { Data } = useAuth();

    const handleCommentsChange = (event) => {
        setComments(event.target.value);
    };

    const handleSubmit = async (event) => {
        if (!rating) {
            setRatingError(true);
            return;
        }
        setRatingError(false);
        console.log("Submitting review:", { comments, rating });
        try {
            const response = await axios.post("/api/addreview", {
                product_id,
                user_id: Data.user_id,
                rating,
                comments,
            });
            console.log(response.data);
            handleClose();
            setReviews((prevReviews) => [
                ...prevReviews,
                {
                    comments: response.data.review.comments,
                    rating: response.data.review.rating,
                    user_id: Data.user_id,
                    user_name:
                        response.data.review.first_name +
                        " " +
                        response.data.review.last_name,
                },
            ]);
        } catch (error) {
            console.error(
                "Error while adding product to cart:",
                error.response?.data || error.message
            );
        }
    };

    function handleClose() {
        setComments("");
        setRating(null);
        setFormDialogOpen(false);
    }

    return (
        <>
            <Dialog
                open={formDialogOpen}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleSubmit(event);
                    },
                }}
            >
                <DialogTitle>Product Review</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ width: "500px" }}>
                        Rating
                    </DialogContentText>
                    <DialogContentText>
                        <Rating
                            name="review-rating"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                                setRatingError(false); // Clear error on valid selection
                            }}
                        />
                        {ratingError && (
                            <Typography color="error" variant="caption">
                                Rating is required.
                            </Typography>
                        )}
                    </DialogContentText>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="comments"
                        name="comments"
                        label="Enter Review"
                        multiline
                        rows={5}
                        fullWidth
                        variant="standard"
                        value={comments}
                        onChange={handleCommentsChange}
                        inputProps={{
                            maxLength: maxLength,
                        }}
                        helperText={`${comments.length}/${maxLength}`} // Live character count
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default ReviewForm;
