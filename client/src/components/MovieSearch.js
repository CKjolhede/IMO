import React, { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

function MovieSearch({handleAddRecommendation}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    //const [errors, setErrors] = useState([]);

    const handleMovieSearch = async () => {
        const response = await axios.get("/movies/searchMovies", {
            params: { searchTerm },
        });
        //console.log("search movie response", response.data)
        setMovies(response.data);
    };

    
    return (
        <div>
            <h1>Search Movies</h1> 
            <input type="text" name="searchMovieTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a movie"/>
            <button onClick={handleMovieSearch}>Search Movies</button>
            <ul>
                {movies?.map((movie) => (
                    <MovieCard key={movie.tmdb_id} movie={movie} handleAddRecommendation={handleAddRecommendation}/>
                ))}
            </ul>
        </div>
);  

};

export default MovieSearch;

    //const handleMovieSearch = async () => {
    //    console.log("FE searchTerm:", searchTerm);
    //    const response = await axios.get('/movies/searchMovies', { params: { searchTerm } });
        //if (response.ok) {
        //    const data = await response.json();
        //    console.log("search movie response from be",data)
        //    setMovies(data)
        //} else {
        //    console.error('Failed to fetch movies:', response.statusText);}