// * Components

// * Images
// import HeroImg from "/public/images/rb_14478.png";

// * MUI Components
import { Box, Button, Container, Typography, styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// * MUI Icons

// * Styled Components
const CustomHeroBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(-3),
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "whitesmoke",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
        fontSize: "40px",
    },
}));

export default function Hero() {
    return (
        <Box
            sx={{
                backgroundColor: "#1B1212",
                minHeight: "80vh",
                paddingBottom: 2,
                marginBottom: 6,
            }}
        >
            <Container>
                <CustomHeroBox>
                    <Box sx={{ flex: 1 }}>
                        {/* <Typography
                            variant="body2"
                            sx={{
                                fontSize: "18px",
                                color: "white",
                                fontWeight: "500",
                                mt: 10,
                                mb: 4,
                            }}
                        >
                            Welcome to Besnik Agency
                        </Typography> */}
                        <Title variant="h2">
                            Play Max Your Ultimate Sports Destination.
                        </Title>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: "18px",
                                color: "whitesmoke",
                                my: 4,
                            }}
                        >
                            Discover the latest in sports goods. From cricket to
                            tennis, we've got everything you need to take your
                            game to the next level.
                        </Typography>
                        {/* <CustomButton
                            backgroundColor="#0F1B4C"
                            color="#fff"
                            buttonText="More About Us"
                            heroBtn={true}
                        /> */}
                        <Button
                            component={RouterLink}
                            to={"/product-listing"}
                            fullWidth
                            size="large"
                            variant="contained"
                            color="error"
                        >
                            shop now
                        </Button>
                    </Box>

                    <Box sx={{ flex: 1.25 }}>
                        <img
                            src={"/public/images/rb_14478.png"}
                            alt="hero illustration"
                            style={{ maxWidth: "100%" }}
                        />
                    </Box>
                </CustomHeroBox>
            </Container>
        </Box>
    );
}
