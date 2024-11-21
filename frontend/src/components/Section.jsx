import { Box, Stack, Typography } from "@mui/material";
import ImgMediaCard from "./Card";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Loading from "./Loading";

function Section({ sectionHeading, url }) {
    const [sectionProducts, setSectionProducts] = useState([null]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSectionProducts = async () => {
            try {
                const response = await axios.get(url);
                console.log("Section API call successful!", response.status);
                console.log(response.data.products);
                if (sectionHeading === "New Arrival")
                    setSectionProducts(response.data.products);
                else setSectionProducts(response.data);
            } catch (error) {
                console.error("Error calling API:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSectionProducts();
    }, [sectionHeading, url]);

    if (loading) return <Loading />;
    return (
        <Box sx={{ margin: "2.5rem 0" }}>
            <Typography
                variant="h4"
                fontWeight={"bold"}
                align="center"
                margin={"16px"}
            >
                {sectionHeading}
            </Typography>
            <Stack
                direction={"row"}
                gap={2}
                flexWrap={"wrap"}
                justifyContent={"center"}
            >
                {sectionProducts.map(
                    (sectionProduct) =>
                        sectionProduct && (
                            <ImgMediaCard
                                key={sectionProduct.product_id}
                                name={sectionProduct.name}
                                price={sectionProduct.price}
                                image_url={`/images/${sectionProduct.image_url}`}
                            />
                        )
                )}
            </Stack>
        </Box>
    );
}
export default Section;
