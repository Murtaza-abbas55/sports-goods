import { useForm } from "react-hook-form";
import axios from "axios";

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue="4344@example.com" {...register("email")} />
            <input
                defaultValue={"fast1"}
                {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
            <input type="submit" />
        </form>
    );
}

export default Login;
