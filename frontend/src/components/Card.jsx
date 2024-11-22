import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function ImgMediaCard({
    name,
    price,
    image_url,
    product_id,
    new_price = null,
    discount_percentage = null,
}) {
    return (
        <Card elevation={5} sx={{ display: "flex", width: 350 }}>
            <CardActionArea
                component={RouterLink}
                to={`product-listing/product/${product_id}`}
            >
                {discount_percentage && (
                    <Typography
                        padding={1.5}
                        color="error"
                        marginBottom={1}
                        fontWeight={"bold"}
                    >
                        {discount_percentage + "% OFF"}
                    </Typography>
                )}

                <CardMedia
                    component="img"
                    alt="green iguana"
                    image={image_url}
                    height={"250px"}
                />
                <Divider />
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        height={100}
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        {name}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            textDecoration: new_price ? "line-through" : "none",
                        }}
                    >
                        {"RS. " + price}
                    </Typography>

                    {new_price && (
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                            marginTop={2}
                        >
                            {"RS. " + new_price}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default ImgMediaCard;
