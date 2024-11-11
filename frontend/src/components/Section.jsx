import { Box, Stack, Typography } from "@mui/material";
import ImgMediaCard from "./Card";

function Section({ sectionHeading }) {
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
                <ImgMediaCard name={"Basketball"} price={2000} />
                <ImgMediaCard name={"Basketball"} price={2000} />
                <ImgMediaCard name={"Basketball"} price={2000} />
                <ImgMediaCard name={"Basketball"} price={2000} />
                <ImgMediaCard name={"Basketball"} price={2000} />
            </Stack>
        </Box>
    );
}
export default Section;
