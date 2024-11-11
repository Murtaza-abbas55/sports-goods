import { Box, Stack, Typography } from "@mui/material";
import ImageCarousel from "../components/ImageCarousel";
import DrawerAppBar from "../components/Navbar";
import ImgMediaCard from "../components/Card";
import Section from "../components/Section";

function Header() {
    return (
        <>
            <DrawerAppBar />
            <ImageCarousel />
            <Section sectionHeading={"New Arrival"} />
            <Section sectionHeading={"Trending"} />
        </>
    );
}

export default Header;
