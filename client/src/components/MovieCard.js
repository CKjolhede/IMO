import React from 'react';


function MovieCard({ movie, handleAddRecommendation }) {
    console.log('moviecard movie', movie)
    const image_url = 'https://image.tmdb.org/t/p/original' + movie.poster_path;

    return (
        <>
            <div className="movie-card-header"><h1>{movie.title}</h1></div>
            <div className="movie-card-poster">
                <img src={image_url} alt={'poster'} />
                <p>{movie.overview}</p>
                <p>Release Date:{movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
                <p>TMDB ID: {movie.tmdb_id}</p> 
                <button onClick={() => handleAddRecommendation(movie)}>Recommend</button>

            </div>
        </>
    );
    };

export default MovieCard; 
                
                