import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
function ImageCarousel() {
    const items = [
        {
            name: (
                <img
                    src="./public/images/logo_3_.png"
                    alt="hola"
                    height={"300px"}
                />
            ),
        },
        {
            // name: <img src="./public/images/basketball.jpg" alt="hola" />,
            name: (
                <img
                    src="./public/images/basketball.jpg"
                    alt="hola"
                    height={"300px"}
                />
            ),
        },
    ];

    return (
        <Carousel
            stopAutoPlayOnHover={true}
            // height={"400px"}
            className="carousel"
        >
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    );
}

function Item(props) {
    return (
        <Paper>
            <div>{props.item.name}</div>
        </Paper>
    );
}

export default ImageCarousel;
