import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/auth/signup", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            // Handle user login success
        } catch (userError) {
            console.warn(userError);
        } finally {
            navigate("/login");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
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
                        label="User ID"
                        variant="filled"
                        placeholder="integer"
                        {...register("user_id", { required: true })}
                        error={!!errors.user_id}
                        helperText={
                            errors.phone ? "This field is required" : ""
                        }
                        size="large"
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="First Name"
                        variant="filled"
                        placeholder="John"
                        {...register("first_name", { required: true })}
                        error={!!errors.first_name}
                        helperText={
                            errors.first_name ? "This field is required" : ""
                        }
                        size="large"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        variant="filled"
                        placeholder="John Doe"
                        {...register("last_name", { required: true })}
                        error={!!errors.last_name}
                        helperText={
                            errors.last_name ? "This field is required" : ""
                        }
                        size="large"
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="Phone Number"
                        variant="filled"
                        placeholder="03000000000"
                        {...register("phone_number", { required: true })}
                        error={!!errors.phone_number}
                        helperText={
                            errors.phone_number ? "This field is required" : ""
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
