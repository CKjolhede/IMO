import React, {useState, useEffect  } from 'react';
import MovieCard from "./MovieCard";
import MovieSearch from "./MovieSearch";


export default function Movies() {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        try {
            const response = async () => await fetch('/movies/', { method: 'GET' });
            if (response.ok) {
                const data = response.json();
                console.log(data);
                setMovies(data);
            }
        }
        catch (error) {
            console.error('Unable to fetch movies:', error);
        }   
    }, []);
        return (
            <div>
                <MovieSearch />
                <h1>Movies</h1>
                <ul>
                    {console.log(movies)
                    && movies?.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            </div>
        );

}