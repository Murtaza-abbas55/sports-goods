import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { useState } from "react";
import { Stack, Typography } from "@mui/material";

function Reviews({ product_id }) {
    const [reviews, setReviews] = useState([
        {
            review_id: 1,
            rating: 5,
            comments: "Ordered it today it was very good",
            user_id: "4344",
        },
        {
            review_id: 2,
            rating: 5,
            comments: "Ordered it today it was very good",
            user_id: "4344",
        },
        {
            review_id: 3,
            rating: 5,
            comments: "Ordered it today it was very good",
            user_id: "4344",
        },
        {
            review_id: 4,
            rating: 5,
            comments: "Ordered it today it was very good",
            user_id: "4344",
        },
    ]);
    console.log(reviews);

    return (
        <>
            <h1>Reviews</h1>
            <p>This is Review of {product_id}</p>
            <List>
                {reviews.map((review) => (
                    <ListItem key={review.review_id}>
                        <Stack>
                            <Typography variant="h5">
                                {review.user_id}
                            </Typography>
                            <Typography>{review.rating}</Typography>
                            <Typography>{review.comments}</Typography>
                        </Stack>
                    </ListItem>
                ))}
            </List>
        </>
    );
}
export default Reviews;
