import { Box, Button, Divider, Stack, Typography } from "@mui/material";

function Product() {
    return (
        <>
            <Stack
                direction={{ sm: "row" }}
                justifyContent={"center"}
                alignItems={{ xs: "center", sm: "start" }}
                border={"solid 3px blue"}
                gap={2}
                marginTop={{ xs: "5rem", sm: "10rem" }}
            >
                <Box alignSelf={"center"}>
                    <img
                        style={{ verticalAlign: "center" }}
                        src="./images/basketball.jpg"
                        alt=""
                        width={"100%"}
                    />
                </Box>
                <Divider />
                <Box>
                    <Stack alignItems={"center"} justifyContent={"center"}>
                        <Box padding={2} maxWidth={500}>
                            <Typography
                                gutterBottom
                                variant="h3"
                                fontWeight={"bold"}
                            >
                                Basketball Made By Lebron Himself
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h5"
                                fontWeight={"bold"}
                            >
                                RS.2000
                            </Typography>
                            <Typography
                                textAlign={"justify"}
                                gutterBottom
                                component="p"
                            >
                                This is Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Magni ex vitae consequatur n.
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Non, aspernatur. Beatae minus
                                sunt quam commodi, mollitia nemo sit veritatis
                                laborum consequatur tempore, non veniam
                                voluptatibus ex ut dolorum similique voluptatum.
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Vel laboriosam maiores nemo
                                quod exercitationem animi accusantium
                                dignissimos ipsa? Fuga vitae consequuntur
                                corrupti, sapiente ducimus quaerat odio.
                                Molestiae a minus nihil?
                            </Typography>
                            <Button variant="contained">Add to Cart</Button>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </>
    );
}
export default Product;
