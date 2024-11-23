import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { useEffect, useState } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Rating from "@mui/material/Rating";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

function Reviews({ product_id }) {
    const { Data } = useAuth();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/reviews/${product_id}`);
                setReviews(response.data.data.reviews);
                console.log("Fetching product reviews");
                console.log(response.data.data.reviews);
            } catch (error) {
                console.error("Error fetching product review:", error);
            }
        };

        fetchData();
    }, [product_id]);
    console.log(reviews);

    async function postReview(product_id) {
        try {
            const response = await axios.post("/api/addreview", {
                product_id,
                user_id: Data.user_id,
                rating: 4,
                comments: "review sent from frontend",
            });
            console.log(response.data);
        } catch (error) {
            console.error(
                "Error while adding product to cart:",
                error.response?.data || error.message
            );
        } finally {
            setReviews((prevReviews) => [
                ...prevReviews,
                {
                    user_name: Data.user_name,
                    user_id: Data.user_id,
                    rating: 4,
                    comments: "review sent from frontend",
                },
            ]);
        }
    }

    // async function postReview(product_id) {
    //     const newReview = {
    //         product_id,
    //         user_id: Data.user_id,
    //         rating: 4,
    //         comments: "review sent from frontend",
    //     };

    //     try {
    //         const response = await axios.post("/api/addreview", newReview);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(
    //             "Error while adding product review:",
    //             error.response?.data || error.message
    //         );
    //         alert("Failed to post the review. Please try again.");
    //     } finally {
    //         setReviews((prevReviews) => [...prevReviews, newReview]);
    //     }
    // }

    async function deleteReview(product_id, user_id) {
        try {
            const response = await axios.post("/api/deleteReview", {
                product_id,
                user_id,
            });
            console.log(response.data);
            setReviews((prevReviews) =>
                prevReviews.filter((review) => review.user_id !== user_id)
            );
        } catch (error) {
            console.error(
                "Error while deleting review cart:",
                error.response?.data || error.message
            );
        }
    }
    console.log("reviews");
    console.log(reviews);

    return (
        <>
            <Divider />
            <Typography textAlign={"center"} variant="h4">
                Reviews
            </Typography>
            {reviews.length === 0 ? (
                <h1>Empty</h1>
            ) : (
                <>
                    <List>
                        {reviews.map((review) => (
                            <ListItem divider key={review.user_id}>
                                <Stack>
                                    <Typography variant="h5">
                                        {review.user_name}
                                    </Typography>
                                    <Stack gap={1} direction={"row"}>
                                        <Rating
                                            name="read-only"
                                            value={review.rating}
                                            readOnly
                                        />
                                        <Typography fontWeight={"bold"}>
                                            {review.rating + ".0"}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        color="text.secondary"
                                        marginTop={1}
                                    >
                                        {review.comments
                                            .charAt(0)
                                            .toUpperCase() +
                                            review.comments.slice(1)}{" "}
                                    </Typography>
                                    {Data?.user_id === review.user_id && (
                                        <Stack marginTop={3} direction={"row"}>
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    deleteReview(
                                                        product_id,
                                                        Data.user_id
                                                    )
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    )}
                                </Stack>
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
            <Button
                variant="contained"
                sx={{ margin: "10px 10px" }}
                onClick={() => postReview(product_id)}
            >
                Review Product
            </Button>
        </>
    );
}
export default Reviews;
