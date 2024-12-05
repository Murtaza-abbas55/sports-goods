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
import ReviewForm from "./ReviewForm";
import Modal from "@mui/material/Modal";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function Reviews({ product_id }) {
    const { Data } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [openLoginMessage, setOpenLoginMessage] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);

    function openForm() {
        if (Data) setFormDialogOpen(true);
        else handleLogin();
    }

    function handleLogin() {
        setOpenLoginMessage(true);
    }

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
                                        {review.comments}
                                    </Typography>
                                    {Data?.user_id === review.user_id && (
                                        <Stack marginTop={3} direction={"row"}>
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
                onClick={openForm}
            >
                Review Product
            </Button>
            <ReviewForm
                formDialogOpen={formDialogOpen}
                setFormDialogOpen={setFormDialogOpen}
                product_id={product_id}
                reviews={reviews}
                setReviews={setReviews}
            />
            <Modal
                open={openLoginMessage}
                onClose={() => {
                    setOpenLoginMessage(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        textTransform={"capitalize"}
                    >
                        Login to review product
                    </Typography>
                    <Button
                        component={RouterLink}
                        to={"/login"}
                        variant="contained"
                    >
                        Log In
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
export default Reviews;
