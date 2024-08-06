// src/contexts/AuthContext.js
import React, { useContext, useState, createContext, useEffect, } from "react";
import { useNavigate } from
    "react-router-dom";
//import datetime, {timedelta} from "datetime" ;
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        user: null,
    });
    
    useEffect(() => {
        const checkAuthorization = async () => {
            const response = await fetch("/authorized");
            if (response.ok) {
                const user = await response.json();
                setAuth({
                    isLoggedIn: true,
                    user: user,
            });
            }
        };
        checkAuthorization();
    }, []);

    const login = (user) => {
        setAuth({
            isLoggedIn: true,
            user: user,
        });
        navigate('/home');
    };

    const logout = async () => {
        const response = await fetch("/logout", {
            method: "DELETE",
        });
        if (response.ok) {
            setAuth({
                isLoggedIn: false,
                user: null
            });
            navigate("/");
        }
    };

    return (
        <AuthContext.Provider value={{ auth, isLoggedIn: auth.isLoggedIn, user: auth.user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};