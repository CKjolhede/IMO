// src/contexts/RecContext.js
import React, { useContext, useState, createContext, useEffect, } from "react";
import { useAuth } from '../contexts/AuthContext';
const RecContext = createContext();

export const useRec = () => useContext(RecContext);

export const RecProvider = ({ children }) => {
    const { user } = useAuth();
    const [recommendations, setRecs] = useState([]);
    useEffect(() => {
        if (user) {

            const fetchRecommendations = async () => {
                try {
                    const response = await fetch("/recommendations/" + user.id, {
                        method: "GET",
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setRecs(data);
                    }
                } catch (error) {
                    console.error("Unable to fetch recommendations:", error);
                }
            };
            fetchRecommendations();
        }
    },[user]);

    const removeRecommendation = async (rec_id) => {
        try {
            const response = await fetch("/recommendations/" + rec_id, {
                method: "DELETE",
            });
            if (response.ok) {
                setRecs(
                    recommendations.filter((r) => r.id !== rec_id)
                );
            }
        } catch (error) {
            console.error("Failed to remove recommendation", error);
        }
    };

    const createRecommendation = async (movie_id, user_id) => {
        try {
            const response = await fetch("/recommendations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    movie_id: movie_id,
                    user_id: user_id,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                setRecs([data, ...recommendations]);
            }
    } catch (error) {
        console.error("Failed to create recommendation", error);
    }
}
    const removeRecMovies = (movieList) => {
        return movieList.filter(
            (movie) =>
                !movie.recommendations.some(
                    (recommendation) => recommendation.user_id === user.id
                )

        );
    };

    return (
        <RecContext.Provider value={{ recommendations, removeRecommendation, createRecommendation, setRecs, removeRecMovies }}>
            {children}
        </RecContext.Provider>
        )
}
