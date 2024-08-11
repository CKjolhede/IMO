import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function RecCard({ rec }) {
    const {comment, title, poster_path, rating }  = rec
    const { user } = useAuth();
    const navigate = useNavigate();
    const [accepted, setAccepted] = useState(null);

    return (
        <>
            <div className="rec-card">
                <div className="rec-card-header">{title}</div>
                <div className="movie-card">
                    <img src={poster_path} alt={title} />
                </div>
                <div className="rec-card-rating">{rating}</div>

                <button className="rec-card-rate" default='none' onClick={() => setAccepted(true)}>Accept</button>

                <button className="rec-card-rate" default='none' onClick={() => setAccepted(false)}>Decline</button>
                
                <p className="rec-card-comment">{comment}</p>
                <div className="rec-card-header-right">
                    <button
                        className="rec-card-header-btn"
                        onClick={() => {
                            navigate("/profile/" + user.id);
                        }}
                    >
                        View Profile
                    </button>
                </div>
            </div>
        </>
    );
}

export default RecCard;