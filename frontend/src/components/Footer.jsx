import { Box } from "@mui/material";
import { Typography } from "@mui/material";
function Footer() {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: "black",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10rem",
                }}
            >
                <Typography flexGrow={1} variant="h3" color="white">
                    Footer
                </Typography>
            </Box>
        </>
    );
}
export default Footer;
