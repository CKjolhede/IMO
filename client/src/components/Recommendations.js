import React, { useState, useEffect } from "react";   
import MovieCard from "./MovieCard";
import { useAuth } from "../contexts/AuthContext";        

function Recommendations() {
        const [recommendations, setRecommendations] = useState([]);
        const { user } = useAuth();

        
        useEffect(() => {
                try {
                        const response = () => (fetch('/recommendations/' + user.id, { method: 'GET' }));
                        if (response.ok) {
                                const data = response.json();
                                setRecommendations(data);
                        }
                }
                catch (error) {
                        console.error('Unable to fetch recommendations:', error);
                }
        }, [user.id]);
        
        const handleRecommendation = async (movie) => {
                try {
                        const response = await fetch('/recommendations', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                        'user_id': user.id,
                                        'movie_id': movie.id,
                                }),
                        });
                        if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        const data = response.json();
                        setRecommendations([data, ...recommendations]);
                }
                catch (error) {
                        console.error("Failed to send recommendation", error);
                }
        }

                return (
                        <>
                        <h1>Recommendations</h1>
                        <div className="Reclist">
                        {recommendations.map((rec) => (<MovieCard key={rec.id} movie={rec} handleRecommendation={handleRecommendation} /> ), 
                        )}
                
                                </div>
                        </>
                );

}
export default Recommendations;



