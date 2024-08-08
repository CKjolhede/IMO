//src/contexFindContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
const FindContext = createContext();

export const useFind = () => useContext(FindContext);

export const FindProvider = ({ children }) => {
    const { following_id, }
    const { user } = useAuth();
    const [friend, setFriend] = useState()

    useEffect(() => {
        const friendById = async () => {
            const response = await fetch("/users/" + following_Id);
            if (response.ok) {
                const friend = await response.json();
                setFriend(friend);
            }
        };
        friendById();
    }, []);
}