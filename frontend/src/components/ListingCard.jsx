import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";

function ListingCard({ name, price, stock }) {
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => setQuantity(quantity + 1);
    const handleRemove = () => setQuantity(quantity - 1);

    function handleAddToCart() {
        console.log(name);
    }

    return (
        <Card
            sx={{
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "column",
                width: 300,
            }}
        >
            <CardActionArea disabled={stock == 0 ? true : false} href="/">
                <CardMedia
                    component="img"
                    alt="green iguana"
                    image="./public/images/basketball.jpg"
                    width={"150px"}
                />
                <Divider />
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ flex: "1", color: "text.secondary" }}
                    >
                        {"RS. " + price}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                }}
            >
                <IconButton
                    disabled={quantity == 1 ? true : false}
                    onClick={handleRemove}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        // margin: "0.5rem auto",
                    }}
                    aria-label="increase"
                >
                    <RemoveCircleIcon />
                </IconButton>

                <Box>
                    <Typography marginTop={1}>{quantity}</Typography>
                </Box>

                <IconButton
                    disabled={quantity == stock ? true : false}
                    onClick={handleAdd}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        // margin: "0.5rem auto",
                    }}
                    aria-label="increase"
                >
                    <AddCircleIcon />
                </IconButton>
            </Box>

            {stock > 0 ? (
                <Button
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "0.5rem auto",
                    }}
                    variant="outlined"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
            ) : (
                <Button
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "0.5rem auto",
                    }}
                    variant="contained"
                    disabled
                >
                    Out of Stock
                </Button>
            )}
        </Card>
    );
}
export default ListingCard;
