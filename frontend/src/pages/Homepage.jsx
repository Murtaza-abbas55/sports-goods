import { Stack, Typography } from "@mui/material";
import ImageCarousel from "../components/ImageCarousel";
import DrawerAppBar from "../components/Navbar";
import ImgMediaCard from "../components/Card";

function Header() {
    return (
        <>
            <DrawerAppBar />
            <ImageCarousel />
            <Typography
                variant="h4"
                fontWeight={"bold"}
                align="center"
                margin={"16px"}
            >
                New Arrival
            </Typography>
            <Stack
                direction={"row"}
                gap={2}
                flexWrap={"wrap"}
                justifyContent={"center"}
            >
                <ImgMediaCard name={"Basketball"} price={2000} />
                <ImgMediaCard name={"Basketball"} price={2000} />
                <ImgMediaCard name={"Basketball"} price={2000} />
                <ImgMediaCard name={"Basketball"} price={2000} />
                <ImgMediaCard name={"Basketball"} price={2000} />
            </Stack>
        </>
    );
}

export default Header;
