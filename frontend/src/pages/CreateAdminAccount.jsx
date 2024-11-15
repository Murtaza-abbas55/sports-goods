import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";

function CreateAdminAccount() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/admin/signup", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            // Handle user login success
        } catch (userError) {
            console.warn(userError);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                border: "solid 5px green",
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    alignSelf: "center",
                    flexDirection: "column",
                    width: "400px",
                    padding: "16px 0",
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={"bold"}
                    letterSpacing={"2px"}
                >
                    New Admin Account
                </Typography>

                <form style={{}} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="dense"
                        label="Username"
                        variant="filled"
                        placeholder="John"
                        {...register("admin_username", { required: true })}
                        error={!!errors.first_name}
                        helperText={
                            errors.first_name ? "This field is required" : ""
                        }
                        size="large"
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="Email"
                        variant="filled"
                        placeholder="4344@example.com"
                        {...register("email", { required: true })}
                        error={!!errors.email}
                        helperText={
                            errors.email ? "This field is required" : ""
                        }
                        size="large"
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="Create Password"
                        variant="filled"
                        type="password"
                        {...register("password", { required: true })}
                        error={!!errors.password}
                        helperText={
                            errors.password ? "This field is required" : ""
                        }
                        size="large"
                        fullWidth
                    />
                    <Stack
                        margin="dense"
                        sx={{ margin: "10px" }}
                        justifyContent={"center"}
                        gap={2}
                    >
                        <Button variant="contained" type="submit">
                            Sign Up
                        </Button>
                        <Button
                            component={RouterLink}
                            to={"/admin"}
                            variant="contained"
                            type="submit"
                        >
                            Cancel
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
export default CreateAdminAccount;
