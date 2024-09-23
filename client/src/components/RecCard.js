import React from 'react';
import { useRec } from '../contexts/RecContext';
import { useAuth } from '../contexts/AuthContext';

function RecCard({ recommendation }) {
    const rec = recommendation;
    const { user } = useAuth();
    const { removeRecommendation } = useRec();
    const image_url = rec.movie?.poster_path ? 'https://image.tmdb.org/t/p/original' + rec.movie.poster_path : null;
    const image_url2 = rec.movie?.backdrop_path ? 'https://image.tmdb.org/t/p/original' + rec.movie.backdrop_path : null;
    const rounded_rating = Math.round(rec.movie.rating * 10) / 10;
    return (
        <>
            <div className="userprofile-friendRecs">
                
                <div className="moviecard-body">
                    <div className="moviecard-backdrop">
                        <img
                            src={image_url2}
                            alt={"backdrop"}/>
                    </div>
                    <img
                        className="moviecard-poster"
                        src={image_url}
                        alt={"poster"}
                    />
                    <div className="moviecard-header">
                        <h2>{rec.movie.title}</h2>
                    </div>
                    <div className="moviecard-overview">
                        Overview:
                        <br />
                        <p style={{ fontSize: "18px" }}>{rec.movie.overview}</p>
                    </div>
                    <p className="moviecard-release">
                        {rec.movie.release_date.split("-")[0]}
                    </p>
                    <div className="moviecard-details-container">
                        <p className="moviecard-rating">
                            User Rating: {rounded_rating}
                        </p>
                        <p className="moviecard-tmdbid">
                            TMDB ID: {rec.movie_id}
                        </p>
                        {rec.user.id === user.id && (
                            <p className="moviecard-removerec-button">
                                <button
                                    onClick={() => removeRecommendation(rec.id)}
                                >
                                    Remove Recommendation
                                </button>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
    };

export default RecCard; 
                
                