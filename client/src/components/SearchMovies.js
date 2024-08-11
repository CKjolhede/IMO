import React, { useState } from "react";
import axios from "axios";
import RecCard from "./RecCard";

function SearchMovies(removeMovie, recMovie) {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [errors, setErrors] = useState([]);
    

    const handleMovieSearch = async () => {
    try{
        const response = await axios.get('/movies/searchMovies', { params: { searchTerm }});
        setMovies(response.data);
    } catch (error) {
        setErrors(error, ...errors)
        console.error('Unable to fetch movies:', error);
    }
    };
    
    return (
        <div>
            <h1>Search Movies</h1> 
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a movie"/>
            <button onClick={handleMovieSearch}>Search Movies</button>
            <ul>
                {movies?.map((movie) => (
                    <RecCard key={movie.id} removeMovie={removeMovie} recMovie={recMovie} movie={movie} />
                ))}
        </ul>
        </div>
);  

};

export default SearchMovies;
