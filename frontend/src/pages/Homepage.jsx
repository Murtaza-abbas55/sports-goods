import ImageCarousel from "../components/ImageCarousel";
import DrawerAppBar from "../components/Navbar";
import Section from "../components/Section";
import CategoryList from "../components/CategoryLists";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import SaleSection from "../components/SaleSection";

function Header() {
    return (
        <>
            <DrawerAppBar />
            <ImageCarousel />
            <Section sectionHeading={"New Arrival"} url={"/api/new-arrivals"} />
            <Section
                sectionHeading={"Trending"}
                url={"/api/trending-products"}
            />
            <SaleSection />
            <CategoryList />
            <Footer />
            <Link to={"/admin"}>Admin Only</Link>
            <Link to={"/list"}>User Only</Link>
            <Link to={"/product-listing"}>ListProducts</Link>
        </>
    );
}

export default Header;
