import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function CategoryCard({ name }) {
    return (
        <Card sx={{ display: "flex", width: 300 }}>
            <CardActionArea href="/">
                <CardMedia
                    component="img"
                    alt="green iguana"
                    image="./public/images/basketball.jpg"
                    width={"150"}
                />
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            margin: "0",
                            padding: "0",
                            display: "flex",
                            justifyContent: "center",
                            fontWeight: "bold",
                        }}
                    >
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default CategoryCard;
