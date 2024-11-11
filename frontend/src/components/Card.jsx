import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider } from "@mui/material";

function ImgMediaCard({ name, price }) {
    return (
        <Card sx={{ display: "flex", width: 250 }}>
            <CardActionArea href="/">
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
                        justifyContent: "center",
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        {"RS. " + price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default ImgMediaCard;
