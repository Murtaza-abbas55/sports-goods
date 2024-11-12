import React from "react"; // Import React
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddProductForm from "../components/AddProduct"; // Importing AddProductForm

function Login() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = React.useState(false); // State to track admin login

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
                withCredentials: true, // Include cookies
            });

            if (response.data.isAdmin) {
                console.log("Admin login successful:", response.data);
                setIsAdmin(true); // Set admin state to true
                navigate("/add-product"); // Redirect to AddProductForm route
            } else if (response.data.isUser) {
                console.log("User login successful:", response.data);
                // Handle user-specific navigation, if any
            }
        } catch (userError) {
            console.warn("User login failed, trying admin login...");

            try {
                const response = await axios.post("/api/admin/login", data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });

                if (response.data.isAdmin) {
                    console.log("Admin login successful:", response.data);
                    setIsAdmin(true); // Set admin state to true
                }
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
                {/* Conditionally render AddProductForm if admin is logged in */}
                {isAdmin && <Navigate to={"/form"} />}
            </Paper>
        </Box>
    );
}

export default Login;
