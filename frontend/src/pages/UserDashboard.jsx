import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useFetchUserDetails from "../hooks/useFetchUserDetails";
import axios from "axios";

const UserDashboard = () => {
    const { userId } = useParams();
    const { Data, logout } = useAuth();
    const navigate = useNavigate();
    const { userDetails, setUserDetails, loading, error } =
        useFetchUserDetails();

    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
        password: "",
    });

    // State to handle validation errors
    const [formErrors, setFormErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
        password: "",
    });

    useEffect(() => {
        if (!Data?.isUser || Data?.user_id != userId) {
            navigate("/login"); // Redirect to login if not authenticated
        }
    }, [Data, userId, navigate]);

    useEffect(() => {
        if (userDetails) {
            // Pre-fill the form fields with the current user data
            setFormData({
                first_name: userDetails.first_name,
                last_name: userDetails.last_name,
                email: userDetails.email,
                phone_number: userDetails.phone_number,
                address: userDetails.address,
                password: "", // Do not pre-fill password for security reasons
            });
        }
    }, [userDetails]);

    const handleLogout = () => {
        logout(); // Clear auth context and local storage
        navigate("/"); // Redirect to home page
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Initialize errors object
        const errors = {};

        // Validate fields
        if (!formData.first_name) errors.first_name = "First name is required";
        if (!formData.last_name) errors.last_name = "Last name is required";
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email address is invalid";
        }
        if (!formData.phone_number) {
            errors.phone_number = "Phone number is required";
        } else if (!/^(03)\d{9}$/.test(formData.phone_number)) {
            errors.phone_number =
                "Phone number must be 11 digits, beginning with 03";
        }
        if (!formData.address) errors.address = "Address is required";
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        } else if (
            !/[A-Za-z]/.test(formData.password) ||
            !/\d/.test(formData.password)
        ) {
            errors.password = "Password must contain both letters and numbers";
        }

        // Set form errors
        setFormErrors(errors);

        // If there are validation errors, prevent submission
        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            const response = await axios.post(
                "/api/auth/update",
                {
                    user_id: Data.user_id,
                    phone_number: formData.phone_number,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    password: formData.password,
                    address: formData.address,
                    email: formData.email,
                },
                { withCredentials: true }
            );
            console.log("update user");
            console.log(response);
            console.log("Updated Data:", formData);
            setOpenDialog(false);
        } catch (error) {
            console.error("Error updating user details:", error);
        }
    };

    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    textAlign: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                component={"section"}
            >
                <Button
                    variant="contained"
                    sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                    size="large"
                    component={RouterLink}
                    to={"view-wishlist"}
                >
                    My Wishlist
                </Button>

                <Button
                    variant="contained"
                    sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                    size="large"
                    component={RouterLink}
                    to={"orders"}
                >
                    Orders
                </Button>

                <Button
                    variant="contained"
                    sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                    size="large"
                    onClick={handleOpenDialog}
                >
                    Update Profile
                </Button>

                <Button
                    variant="contained"
                    sx={{ fontSize: "24px", width: "60vw", margin: "20px 0" }}
                    size="large"
                    onClick={handleLogout}
                    style={{ marginTop: "20px" }}
                >
                    Logout
                </Button>
            </Box>

            {/* Update Profile Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Update Profile</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="First Name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            error={Boolean(formErrors.first_name)}
                            helperText={formErrors.first_name}
                        />
                        <TextField
                            label="Last Name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            error={Boolean(formErrors.last_name)}
                            helperText={formErrors.last_name}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            error={Boolean(formErrors.email)}
                            helperText={formErrors.email}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            error={Boolean(formErrors.password)}
                            helperText={formErrors.password}
                        />
                        <TextField
                            label="Phone Number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            error={Boolean(formErrors.phone_number)}
                            helperText={formErrors.phone_number}
                        />
                        <TextField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            error={Boolean(formErrors.address)}
                            helperText={formErrors.address}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserDashboard;
