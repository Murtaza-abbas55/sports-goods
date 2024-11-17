import ImageCarousel from "../components/ImageCarousel";
import DrawerAppBar from "../components/Navbar";
import Section from "../components/Section";
import CategoryList from "../components/CategoryLists";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Header() {
    return (
        <>
            <DrawerAppBar />
            <ImageCarousel />
            <Section sectionHeading={"New Arrival"} />
            <Section sectionHeading={"Trending"} />
            <CategoryList />
            <Footer />
            <Link to={"/admin"}>Admin Only</Link>
            <Link to={"/list"}>User Only</Link>
            <Link to={"/product-listing"}>ListProducts</Link>
        </>
    );
}

export default Header;
