// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { Button, TextField, Typography, CircularProgress } from "@mui/material";
// import Paper from "@mui/material/Paper";
// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Login() {
//     const navigate = useNavigate();
//     const { login } = useAuth(); // Access the login function from context
//     const [loading, setLoading] = useState(false);
//     const [toastOpen, setToastOpen] = useState(false);
//     const [toastMessage, setToastMessage] = useState("");

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm();

//     const handleCloseToast = () => {
//         setToastOpen(false);
//     };

//     const onSubmit = async (data) => {
//         setLoading(true); // Start loading spinner
//         try {
//             // Attempt to log in the user
//             const response = await axios.post("/api/auth/login", data, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 withCredentials: true, // Include cookies
//             });

//             if (response.data.isUser) {
//                 console.log("User login successful:", response.data);
//                 login(response.data); // Save user data to context
//                 navigate("/product-listing"); // Redirect to the product list for regular users
//                 setLoading(false); // Stop loading spinner
//                 return;
//             }
//         } catch (userError) {
//             console.warn("User login failed, trying admin login...");
//         }

//         try {
//             // Attempt to log in as an admin
//             const response = await axios.post("/api/admin/login", data, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 withCredentials: true,
//             });

//             if (response.data.isAdmin) {
//                 console.log("Admin login successful:", response.data);
//                 login(response.data); // Save admin data to context
//                 navigate("/admin"); // Redirect to admin page
//             } else {
//                 throw new Error("Admin login failed.");
//             }
//         } catch (adminError) {
//             console.error(
//                 "Login failed:",
//                 adminError.response
//                     ? adminError.response.data
//                     : adminError.message
//             );
//             setToastMessage("Incorrect email or password!"); // Set error message
//             setToastOpen(true); // Show toast
//         } finally {
//             setLoading(false); // Stop loading spinner
//         }
//     };

//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 border: "solid 5px green",
//                 height: "100vh",
//             }}
//         >
//             <Paper
//                 elevation={10}
//                 sx={{
//                     display: "flex",
//                     gap: "10px",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     flexDirection: "column",
//                     height: "60vh",
//                     width: "400px",
//                 }}
//             >
//                 <Typography variant="h5">Sign In</Typography>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <TextField
//                         label="Email"
//                         variant="filled"
//                         defaultValue="4344@example.com"
//                         {...register("email", {
//                             required: "This field is required",
//                             pattern: {
//                                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                                 message: "Invalid email format",
//                             },
//                         })}
//                         error={!!errors.email}
//                         helperText={errors.email ? errors.email.message : ""}
//                         size="large"
//                         fullWidth
//                     />
//                     <TextField
//                         label="Password"
//                         variant="filled"
//                         type="password"
//                         defaultValue="fast1"
//                         {...register("password", { required: true })}
//                         error={!!errors.password}
//                         helperText={
//                             errors.password ? "This field is required" : ""
//                         }
//                         size="large"
//                         fullWidth
//                     />
//                     <Stack
//                         sx={{ margin: "10px" }}
//                         justifyContent={"center"}
//                         gap={2}
//                     >
//                         <Button
//                             variant="contained"
//                             type="submit"
//                             disabled={loading} // Disable button during loading
//                             startIcon={
//                                 loading && <CircularProgress size={20} />
//                             }
//                         >
//                             {loading ? "Logging In..." : "Log In"}
//                         </Button>
//                         <Button
//                             component={RouterLink}
//                             to="/create_account"
//                             variant="contained"
//                         >
//                             Create Account
//                         </Button>
//                     </Stack>
//                 </form>
//             </Paper>

//             {/* Toast Notification */}
//             <Snackbar
//                 open={toastOpen}
//                 autoHideDuration={3000}
//                 onClose={handleCloseToast}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//             >
//                 <Alert
//                     onClose={handleCloseToast}
//                     severity="error"
//                     sx={{ width: "100%" }}
//                 >
//                     {toastMessage}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// }

// export default Login;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
    Button,
    TextField,
    Typography,
    CircularProgress,
    Paper,
    Stack,
    Box,
    Snackbar,
    Alert,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/auth/login", data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response.data.isUser) {
                login(response.data);
                navigate("/product-listing");
            } else {
                throw new Error("User login failed.");
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
                    login(response.data);
                    navigate("/admin");
                } else {
                    throw new Error("Admin login failed.");
                }
            } catch (adminError) {
                setToastMessage("Incorrect email or password!");
                setToastOpen(true);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                background: "linear-gradient(to bottom, #ffffff, #f0f0f0, #d9d9d9)",
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 4,
                    width: 400,
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Sign In
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                    <TextField
                        label="Email"
                        variant="filled"
                        {...register("email", {
                            required: "This field is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email format",
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Password"
                        variant="filled"
                        type="password"
                        {...register("password", { required: "This field is required" })}
                        error={!!errors.password}
                        helperText={errors.password ? "This field is required" : ""}
                        fullWidth
                        sx={{ marginBottom: 3 }}
                    />
                    <Stack spacing={2} direction="row" justifyContent="center">
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={loading}
                            sx={{
                                backgroundColor: "#000",
                                color: "#fff",
                                ":hover": { backgroundColor: "#333" },
                            }}
                            startIcon={
                                loading && <CircularProgress size={20} />
                            }
                        >
                            {loading ? "Logging In..." : "Log In"}
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/create_account"
                            variant="outlined"
                            sx={{
                                borderColor: "#bbb",
                                color: "#000",
                                ":hover": {
                                    borderColor: "#000",
                                    backgroundColor: "#f0f0f0",
                                },
                            }}
                        >
                            Create Account
                        </Button>
                    </Stack>
                </form>
            </Paper>

            <Snackbar
                open={toastOpen}
                autoHideDuration={3000}
                onClose={handleCloseToast}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseToast}
                    severity="error"
                    sx={{ width: "100%", backgroundColor: "#fff", color: "#000" }}
                >
                    {toastMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Login;
