// src/contexts/AuthContext.js
import React, { useContext, useState, createContext, useEffect } from "react";
//import { useHistory } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        user: null
    });
    const [currentUser, setcurrentUser] = useState(null);


    useEffect(() => {
        const checkAuthorization = async () => {
            const response = await fetch("/authorized");
            if (response.ok) {
                const user = await response.json();
                setAuth({
                    isLoggedIn: true,
                    user
                });
                setcurrentUser(user);
            };
            }

        checkAuthorization();
    }, []);

    const login = (user) => {
        setAuth({
            isLoggedIn: true,
            user,
        });
        setcurrentUser(user);
    };

    const logout = async () => {
        const response = await fetch("/logout", {
            method: "DELETE",
        });
        if (response.ok) {
            setAuth({
                isLoggedIn: false,
                user: null
            })
            setcurrentUser(null);
            
}
            //history.push('/');
    };

    return (
        <AuthContext.Provider value={{ currentUser, auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
