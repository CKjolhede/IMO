//components/Movies.js
import React, { useState, useEffect } from 'react';
import MovieCard from "./MovieCard";
import MovieSearch from "./MovieSearch";
import { useAuth } from '../contexts/AuthContext';
import { useRec } from "../contexts/RecContext";
import defaultProfilePic from "./images/imo_emu.png";


export default function Movies({ handleAddRecommendation }) {
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
        <>
            <h1 className="page-title">Most Popular Movies</h1>
            <h1 className="page-title-userprofile">
                {user.first_name}
                <img src={defaultProfilePic} alt="ProfileImage" />{" "}
            </h1>
            <div className="movies-page">
                <div className="movies-search">
                    <MovieSearch
                        handleAddRecommendation={handleAddRecommendation}
                    />
                </div>
                <div className="movies-list">
                    {movies?.map((movie) => (
                        <MovieCard
                            key={movie.tmdb_id}
                            movie={movie}
                            handleAddRecommendation={handleAddRecommendation}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}