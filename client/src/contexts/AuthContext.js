// src/contexts/AuthContext.js
import React, { useContext, useState, createContext, useEffect } from "react";
import { redirect, useNavigate} from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        user: null
    });


    useEffect(() => {
        const checkAuthorization = async () => {
            const response = await fetch("/authorized");
            if (response.ok) {
                const user = await response.json();
                setAuth({
                    isLoggedIn: true,
                    user: user});}};
        checkAuthorization();
    }, []);

    const login = (user) => {
        setAuth({
            isLoggedIn: true,
            user: user
        });
        navigate('/home/');;
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
            console.log(auth.user)
            
}
            //navigate('/');
    };

    return (
        <AuthContext.Provider value={{ auth,  isLoggedIn: auth.isLoggedIn, user: auth.user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);