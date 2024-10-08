import React from 'react';


function MovieCard({ movie, handleAddRecommendation, isSearchResult }) {
    const image_url = 'https://image.tmdb.org/t/p/original' + movie.poster_path;
    const image_url2 = movie?.backdrop_path
        ? "https://image.tmdb.org/t/p/original" + movie.backdrop_path
        : null;
    const rounded_rating = movie?.rating
        ? Math.round(movie.rating * 10) / 10
        : null;
        return (
            <>
                {!isSearchResult && (
                <div>
                    <div className="moviecard-body">
                        <div className="moviecard-backdrop">
                            <img src={image_url2} alt={"backdrop"} />
                        </div>
                        <img
                            className="moviecard-poster"
                            src={image_url}
                            alt={"poster"}
                        />
                        <div className="moviecard-header">
                            <h2>{movie.title}</h2>
                        </div>
                        <div className="moviecard-overview">
                            Overview:
                            <br />
                            <p style={{ fontSize: "18px" }}>{movie.overview}</p>
                        </div>
                        <p className="moviecard-release">
                            {movie.release_date.split("-")[0]}
                        </p>
                        <div className="moviecard-details-container">
                            <p className="moviecard-rating">
                                User Rating: {rounded_rating}
                            </p>
                            <p className="moviecard-tmdbid">
                                TMDB ID: {movie.tmdbid}
                            </p>
                                <p className="moviecard-removerec-button">
                                    <button
                                        onClick={() =>
                                            handleAddRecommendation(movie)
                                        }
                                    >
                                    Recommend
                                    </button>
                                </p>
                        </div>
                    </div>
                </div>
                )}
                {isSearchResult && (
                <div>            
                    <h2>{movie.title}</h2>
                    <div className="moviecard-poster">
                        <img
                            src={image_url}
                            alt={"poster"} />
                    </div>
                    <button className="moviescard-recommend-button" onClick={() => handleAddRecommendation(movie)}>
                        Recommend
                    </button>
                </div>
            )}
    
        </>
    );
    };

export default MovieCard; 
                
                