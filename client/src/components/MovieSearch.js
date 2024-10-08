import React, { useState} from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

function MovieSearch({handleAddRecommendation}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [recommendedMovieIds, setRecommendedMovieIds] = useState([]);
    //const [errors, setErrors] = useState([]);

    const handleMovieSearch = async () => {
        const response = await axios.get("/movies/searchMovies", {
            params: { searchTerm },
        });
        console.log("movie search response:",response.data);
        setMovies(response.data);
        setSearchTerm("");
    };
    
    const handleAddingRecommendation = (movie) => {
        handleAddRecommendation({ ...movie}); 
        setRecommendedMovieIds([...recommendedMovieIds, movie.tmdb_id]);
    };

    
    return (
        <div>
        {/*//<div className="movies-input">*/}
            <h2>Find Your Favorite Movies</h2>
            <input
                type="text"
                name="searchMovieTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleMovieSearch();
                    }
                }}
                placeholder="Enter movie title"/>
                <button onClick={handleMovieSearch}
                        onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleMovieSearch();
                    }
                }}>
                Search
            </button>
            <ul className="movies-searched-container">
                {movies?.filter((movie) => !recommendedMovieIds.includes(movie.tmdb_id)).map((movie) => (
                    <MovieCard
                        key={movie.tmdb_id}
                        movie={movie}
                        handleAddRecommendation={handleAddingRecommendation}
                        isSearchResult={true}
                    />
                ))}
            </ul>
        </div>
    );  

};

export default MovieSearch;

    //const handleMovieSearch = async () => {
    //    const response = await axios.get('/movies/searchMovies', { params: { searchTerm } });
        //if (response.ok) {
        //    const data = await response.json();
        //    setMovies(data)
        //} else {
        //    console.error('Failed to fetch movies:', response.statusText);}