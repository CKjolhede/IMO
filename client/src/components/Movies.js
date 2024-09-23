//components/Movies.js
import React, { useState, useEffect } from 'react';
import MovieCard from "./MovieCard";
import MovieSearch from "./MovieSearch";
import { useAuth } from '../contexts/AuthContext';
import { useRec } from "../contexts/RecContext";


export default function Movies({handleAddRecommendation}) {
    const [movies, setMovies] = useState([]);
    const { user } = useAuth();
    const { removeRecMovies } = useRec();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviefetch = await fetch('/movies', { method: 'GET' });
                if (moviefetch.ok) {
                    const data = await moviefetch.json();   
                    const sortedMovies = removeRecMovies(data);                
                    setMovies(sortedMovies);                    
                }
            }
            catch (error) {
                console.error('Unable to fetch movies:', error);
            }
        }
        fetchMovies()
    }, [user.id, removeRecMovies]);
    
        return (
            <div>
                <MovieSearch handleAddRecommendation={handleAddRecommendation}/>
                <h1>Movies</h1>
                {movies?.map((movie) => (
                    <MovieCard key={movie.tmdb_id} movie={movie} handleAddRecommendation={handleAddRecommendation}/>
                    ))}
            </div>
        );
}