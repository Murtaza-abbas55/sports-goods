import ImageCarousel from "../components/ImageCarousel";
import DrawerAppBar from "../components/Navbar";
import Section from "../components/Section";
import CategoryList from "../components/CategoryLists";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import SaleSection from "../components/SaleSection";
import Hero from "../components/Hero";

function Header() {
    return (
        <>
            <DrawerAppBar />
            {/* <ImageCarousel /> */}
            <Hero />
            <Section sectionHeading={"New Arrival"} url={"/api/new-arrivals"} />
            <Section
                sectionHeading={"Trending"}
                url={"/api/trending-products"}
            />
            <SaleSection />
            <CategoryList />
            <Footer />
        </>
    );
}

export default Header;
