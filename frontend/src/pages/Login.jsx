import React from "react";  // Import React
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddProductForm from "../components/AddProduct"; // Importing AddProductForm

function Login() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = React.useState(false);  // State to track admin login

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
                setIsAdmin(true);  // Set admin state to true
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
                    setIsAdmin(true);  // Set admin state to true
                
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
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue="4344@example.com" {...register("email")} />
                <input
                    defaultValue="fast1"
                    {...register("password", { required: true })}
                />
                {errors.password && <span>This field is required</span>}
                <input type="submit" />
            </form>

            {/* Conditionally render AddProductForm if admin is logged in */}
            {isAdmin && <AddProductForm />}
        </>
    );
}

export default Login;
