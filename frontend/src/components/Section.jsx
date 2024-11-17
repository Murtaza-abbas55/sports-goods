import { Box, Stack, Typography } from "@mui/material";
import ImgMediaCard from "./Card";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function Section({ sectionHeading, url }) {
    const [sectionProducts, setSectionProducts] = useState([null]);

    const fetchSectionProducts = async () => {
        try {
            const response = await axios.get(url);
            console.log("API call successful!", response.status);
            console.log(response.data.products);
            setSectionProducts(response.data.products);
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    useEffect(() => {
        fetchSectionProducts();
    }, []);

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
