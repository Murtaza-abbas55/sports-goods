import { Box, Stack, Typography } from "@mui/material";
import CategoryCard from "./CategoryCard";

function CategoryList() {
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
                <CategoryCard name={"Cricket"} />
                <CategoryCard name={"Tennis"} />
                <CategoryCard name={"Board Games"} />
                <CategoryCard name={"Hockey"} />
            </Stack>
        </Box>
    );
}
export default CategoryList;
