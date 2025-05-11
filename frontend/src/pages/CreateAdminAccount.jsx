import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import {Snackbar,Alert} from "@mui/material";
function CreateAdminAccount() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
       const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/admin/signup", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            setSnackbar({ open: true, message: "Admin created successfully!", severity: "success" });
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
                            {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email format",
                            },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
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
            <Snackbar
                        open={snackbar.open}
                        autoHideDuration={3000}
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert
                            onClose={() => setSnackbar({ ...snackbar, open: false })}
                            severity={snackbar.severity}
                            sx={{ width: "100%" }}
                        >
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
        </Box>
    );
}
export default CreateAdminAccount;
