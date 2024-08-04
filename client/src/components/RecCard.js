import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function RecCard({ rec }) {
    const { movie_id, id, comment, title, poster, rating, following }  = rec
    const { user } = useAuth();
    const navigate = useNavigate();
    const [accepted, setAccepted] = useState(null);

    return (
        <>
            <div className="rec-card">
                <h1 className="rec-card-title"> Coming Attractions!</h1>
                <div className="rec-card-header">{title}</div>
                <div className="movie-card">
                    <img src={poster} alt={title} />
                    poster
                </div>
                <div className="rec-card-rating">{rating}</div>
                <div className="rec-card-header-left">
                    <img className="rec-card-header-img" src={user.image} alt="profile" />
                    <h3 className="rec-card-header-name">{user.first_name}</h3>
                </div>
                <button className="rec-card-rate" type="checkbox" default='none' onClick={() => setAccepted(true)}>Accept Recommendation</button>
                <button className="rec-card-rate" type="checkbox" default='none' onClick={() => setAccepted(false)}>Decline Recommendation</button>
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