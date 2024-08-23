import React from 'react';
import { useRec } from '../contexts/RecContext';

function RecCard({ recommendation }) {
    const { removeRecommendation } = useRec();
    console.log('reccard movie', recommendation);
    const image_url = 'https://image.tmdb.org/t/p/original' + recommendation.movie.poster_path;
    
    return (
        <>
            <div className="movie-card-header"><h1>{recommendation.movie.title}</h1></div>
            <div className="movie-card-poster">
                <img src={image_url} alt={'poster'} />
                <p>{recommendation.movie.overview}</p>
                <p>Release Date:{recommendation.movie.release_date}</p>
                <p>Rating: {recommendation.movie.vote_average}</p>
                <p>TMDB ID: {recommendation.movie_id}</p> 
                <button onClick={() => removeRecommendation(recommendation.id)}>Remove</button> 

            </div>
        </>
    );
    };

export default RecCard; 
                
                