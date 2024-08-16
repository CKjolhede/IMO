import React, { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

function MovieSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    //const [errors, setErrors] = useState([]);

    const handleMovieSearch = async () => {

        const response = await axios.get('/movies/searchMovies', { params: { searchTerm } });
        setMovies(response.data);
    };
    
    return (
        <div>
            <h1>Search Movies</h1> 
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a movie"/>
            <button onClick={handleMovieSearch}>Search Movies</button>
            <ul>
                {movies?.map((movie) => (
                    <MovieCard key={movie.movie_id} movie={movie} />
                ))}
        </ul>
        </div>
);  

};

export default MovieSearch;
