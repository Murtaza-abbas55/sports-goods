import useFetchSale from "../hooks/useFetchSale";
import ImgMediaCard from "./Card";
import { Box, Stack, Typography } from "@mui/material";

function SaleSection() {
    const { saleProducts, setSaleProducts } = useFetchSale();
    console.log("saleProducts");
    console.log(saleProducts);

    if (saleProducts.length === 0) return;

    return (
        <>
            <Typography
                variant="h4"
                fontWeight={"bold"}
                align="center"
                margin={"16px"}
            >
                Sale
            </Typography>
            <Stack
                direction={"row"}
                gap={5}
                flexWrap={"wrap"}
                justifyContent={"center"}
                sx={{ margin: "2.5rem 0" }}
            >
                {saleProducts.map((saleProduct) => (
                    <ImgMediaCard
                        key={saleProduct.product_id}
                        product_id={saleProduct.product_id}
                        name={saleProduct.name}
                        price={saleProduct.price}
                        image_url={`/images/${saleProduct.image_url}`}
                    />
                ))}
            </Stack>
        </>
    );
}
export default SaleSection;
