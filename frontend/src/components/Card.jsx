import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function ImgMediaCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea href="/products">
                <CardMedia
                    component="img"
                    alt="green iguana"
                    image="./public/images/basketball.jpg"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Product Name Check Length of Product Name
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        RS.2000
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default ImgMediaCard;
