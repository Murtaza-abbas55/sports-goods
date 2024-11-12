import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function CreateAccount() {
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
                    Create Account
                </Typography>
                <form style={{}} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="dense"
                        label="Full Name"
                        variant="filled"
                        placeholder="John Doe"
                        {...register("name", { required: true })}
                        error={!!errors.name}
                        helperText={errors.name ? "This field is required" : ""}
                        size="large"
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="Phone Number"
                        variant="filled"
                        placeholder="03000000000"
                        {...register("phone", { required: true })}
                        error={!!errors.phone}
                        helperText={
                            errors.phone ? "This field is required" : ""
                        }
                        size="large"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Alternate Phone Number"
                        variant="filled"
                        defaultValue={register.phone}
                        {...register("phone", { required: true })}
                        error={!!errors.phone}
                        helperText={
                            errors.phone ? "This field is required" : ""
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
                        label="City"
                        variant="filled"
                        placeholder="Karachi"
                        {...register("city", { required: true })}
                        error={!!errors.city}
                        helperText={errors.city ? "This field is required" : ""}
                        size="large"
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="Address"
                        variant="filled"
                        placeholder="House A10"
                        {...register("address", { required: true })}
                        error={!!errors.address}
                        helperText={
                            errors.address ? "This field is required" : ""
                        }
                        size="large"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
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
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
export default CreateAccount;
