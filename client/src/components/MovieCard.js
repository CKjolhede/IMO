import React from 'react';
import { useAuth } from '../contexts/AuthContext';


function MovieCard({ movie, handleRecommendation }) {
    console.log(movie);
    const { user } = useAuth();
    const { id, tmdb_id, title, overview, release_date, poster_path,} = movie;
    const image_url = 'https://image.tmdb.org/t/p/original' + poster_path;
    
    
    return (
        <>
            <div className="movie-card-header"><h1>{title}</h1></div>
            <div className="movie-card-poster">
                <img src={image_url} alt={'poster'} />

                <p>{overview}</p>
                <p>Release Date:{release_date}</p>
                <p>Movie ID: {id}</p>
                <p>TMDB ID: {tmdb_id}</p>
              
        
            </div>
        </>
    );
    };

export default MovieCard; 
                
                