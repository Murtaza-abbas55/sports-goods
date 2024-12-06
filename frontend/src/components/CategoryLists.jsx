import { Box, Stack, Typography } from "@mui/material";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

function CategoryLists() {
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
                gap={3}
                justifyContent={"center"}
            >
                {categories.map((category) => (
                    <Link
                        component={RouterLink}
                        to={`/product-listing?category_id=${category.category_id}`}
                        key={category.category_id}
                        underline="none" // Removes underline
                        sx={{
                            textDecoration: "none", // remove underline
                            color: "inherit", 
                            width: "200px",
                            height: "100px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s, box-shadow 0.3s",
                            "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
                            },
                        }}
                    >
                        <Typography variant="h6" fontWeight={"bold"} align="center">
                            {category.name}
                        </Typography>
                    </Link>
                ))}
            </Stack>
        </Box>
    );
}

export default CategoryLists;
