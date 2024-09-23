import React from 'react';


function MovieCard({ movie, handleAddRecommendation }) {
    const image_url = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

    return (
        <>
            <div className="card"><h1>{movie.title}</h1></div>
            <div className="movie-card-poster">
                <img src={image_url} alt={'poster'} />
                <p>{movie.overview}</p>
                <p>Release Date:{movie.release_date}</p>
                <p>Rating: {movie.rating}</p>
                <p>TMDB ID: {movie.tmdb_id}</p> 
                <button className=".card button" onClick={() => handleAddRecommendation(movie)}>Recommend</button>

            </div>
        </>
    );
    };

export default MovieCard; 
                
                