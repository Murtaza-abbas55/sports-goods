// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [Data, setData] = useState(null);
    const [cartID, setCartID] = useState(null);
    const [localLoading, setLocalLoading] = useState(true);

    // Load user data from local storage on initialization
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("authData"));
        if (savedData) {
            setIsAuthenticated(true);
            setData(savedData);
        }
        setLocalLoading(false);
    }, []);

    // Merge anonymous cart if user logs in
    useEffect(() => {
        const mergeAnonymousCart = async (user_id) => {
            try {
                const response = await axios.post("/api/merge", {
                    user_id: user_id,
                });
                console.log("Cart merge response:", response.data.cartId);
                setCartID(response.data.cartId);
            } catch (error) {
                console.error("Error merging anonymous cart:", error);
            }
        };
        if (Data) mergeAnonymousCart(Data.user_id);
    }, [Data]);

    // Login and save user data to local storage
    const login = (data) => {
        setIsAuthenticated(true);
        setData(data);
        localStorage.setItem("authData", JSON.stringify(data)); // Save user data to local storage
        console.log(
            localStorage.setItem("authData", JSON.stringify(data)) // Save user data to local storage
        );
    };
    const logout = () => {
    axios
    .post("/api/logout")
    .then((response) => {
        console.log(response.data.message);
    })
    .catch((error) => {
        console.error("Error during logout:", error);
    })
    .finally(() => { 
        setIsAuthenticated(false);
        setData(null);
        setCartID(null);
        localStorage.removeItem("authData");
            });
    };
    

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                Data,
                login,
                logout,
                cartID,
                setCartID,
                localLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
