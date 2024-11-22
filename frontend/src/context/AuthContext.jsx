// src/context/AuthContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [Data, setData] = useState(null);
    const [cartID, setCartID] = useState(null);

    useEffect(() => {
        const mergeAnonymousCart = async (user_id) => {
            try {
                const response = await axios.post("/api/merge", {
                    user_id: user_id,
                });
                console.log("Cart merge response:", response.data.cartId);
                setCartID(response.data.cartId);
                console.log("Data");
                console.log(Data.user_id);
            } catch (error) {
                console.error("Error merging anonymous cart:", error);
            }
        };
        if (Data) mergeAnonymousCart(Data.user_id);
    }, [Data]);

    const login = (data) => {
        setIsAuthenticated(true);
        setData(data);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setData(null); // Clear user data on logout
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, Data, login, logout, cartID, setCartID }}
        >
            {children}
        </AuthContext.Provider>
    );
};
