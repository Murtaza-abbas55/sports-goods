import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function useFetchUserDetails() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState([]);
    const { Data } = useAuth();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get("/api/auth/userdetails");
                console.log("my user info");
                console.log(response);
            } catch (error) {
                console.error("Error fetching info:", error);
                setError("Error");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [Data.user_id]);
    console.log(userDetails);
    console.log(Data);
    return { userDetails, setUserDetails, loading, error };
}
export default useFetchUserDetails;
