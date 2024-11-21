import { Box, Stack, Typography } from "@mui/material";
import CategoryCard from "./CategoryCard";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";

function CategoryList() {
    const {
        products: categories,
        loading,
        error,
    } = useFetch("/api/categories");

    if (loading) return <Loading />;
    if (error) return <h1>Error</h1>;

    return (
        <Box sx={{ margin: "2.5rem 0" }}>
            <Typography
                variant="h4"
                fontWeight={"bold"}
                align="center"
                margin={"16px"}
            >
                Categories
            </Typography>
            <Stack
                direction={"row"}
                flexWrap={"wrap"}
                gap={2}
                justifyContent={"center"}
            >
                {categories.map((category) => (
                    <CategoryCard
                        key={category.category_id}
                        name={category.name}
                        category_id={category.category_id}
                    />
                ))}
            </Stack>
        </Box>
    );
}
export default CategoryList;
