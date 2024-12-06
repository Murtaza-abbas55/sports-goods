import { Box, Typography, Stack, Link } from "@mui/material";

function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: "black",
                color: "white",
                py: 6,
                px: 4,
                mt: "auto",
            }}
        >
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={4}
                justifyContent="center"
                alignItems="center"
            >
                <Box textAlign={{ xs: "center", sm: "left" }}>
                    <Typography variant="h6" gutterBottom>
                        About Us
                    </Typography>
                    <Typography maxWidth={"250px"} variant="body2" color="gray">
                        We are dedicated to providing the best services and products to our customers. Contact us for more information.
                    </Typography>
                </Box>

                <Box textAlign={{ xs: "center", sm: "left" }}>
                    <Typography variant="h6" gutterBottom>
                        Contact Us
                    </Typography>
                    <Typography variant="body2" color="gray">
                        Email: support@example.com
                    </Typography>
                    <Typography variant="body2" color="gray">
                        Phone: +92 3113812318
                    </Typography>
                    <Typography variant="body2" color="gray">
                        Address: Somewehere on Earth
                    </Typography>
                </Box>
            </Stack>

            <Box
                sx={{
                    borderTop: "1px solid gray",
                    mt: 4,
                    pt: 3,
                    textAlign: "center",
                }}
            >
                <Typography variant="body2" color="gray">
                    &copy; {new Date().getFullYear()} Play Max All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;
