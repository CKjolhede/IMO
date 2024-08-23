//components/Movies.js
import React, { useState, useEffect } from 'react';
import MovieCard from "./MovieCard";
import MovieSearch from "./MovieSearch";
import { useAuth } from '../contexts/AuthContext';
import { useRec } from "../contexts/RecContext";


export default function Movies({handleAddRecommendation}) {
    const [movies, setMovies] = useState([]);
    const { user } = useAuth();
    const { noRecMovies } = useRec();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviefetch = await fetch('/movies', { method: 'GET' });
                if (moviefetch.ok) {
                
                    const data = await moviefetch.json();   
                    console.log("fetched movies", data);
                    const sortedMovies = noRecMovies(data);
                    console.log("fetched movies, sorted",sortedMovies);                     
                    setMovies(sortedMovies);                    
                }
            }
            catch (error) {
                console.error('Unable to fetch movies:', error);
            }
        }
        fetchMovies()
    }, [user.id, noRecMovies]);
    
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