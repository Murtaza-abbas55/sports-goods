import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/auth/login", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("User login successful:", response.data);
            // Handle user login success
        } catch (userError) {
            console.warn("User login failed, trying admin login...");

            try {
                const response = await axios.post("/api/admin/login", data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("Admin login successful:", response.data);
                // Handle admin login success
            } catch (adminError) {
                console.error(
                    "Login failed:",
                    adminError.response
                        ? adminError.response.data
                        : adminError.message
                );
            }
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                border: "solid 5px green",
                height: "100vh",
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "60vh",
                    width: "400px",
                }}
            >
                <Typography variant="h5">Sign In</Typography>
                <form style={{}} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Email"
                        variant="filled"
                        defaultValue="4344@example.com"
                        {...register("email", { required: true })}
                        error={!!errors.email}
                        helperText={
                            errors.email ? "This field is required" : ""
                        }
                        size="large"
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        variant="filled"
                        type="password"
                        defaultValue="fast1"
                        {...register("password", { required: true })}
                        error={!!errors.password}
                        helperText={
                            errors.password ? "This field is required" : ""
                        }
                        size="large"
                        fullWidth
                    />
                    <Stack
                        sx={{ margin: "10px" }}
                        justifyContent={"center"}
                        gap={2}
                    >
                        <Button variant="contained" type="submit">
                            Log In
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/create_account"
                            variant="contained"
                            type="submit"
                        >
                            Create Account
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}

export default Login;
