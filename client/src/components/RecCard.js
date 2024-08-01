import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function RecCard({ movie, first_name, user_image, movie_id, comment, title, poster, rating, following, media_type = 'rec'} ) {
    const { user } = useAuth();
    const navigate = useNavigate();
    //const ({ id }, { user }, { comment }, { title }, { poster }, { rating }, { following }, { } ) = ({movie_id, user, comment, title, poster, rating, following, accepted})
    
    const [accepted, setAccepted] = useState(null);
    
    
    
    return (
        <div className="rec-card">
            <h1 className="rec-card-title"> Coming Attractions!</h1>
            <div className="rec-card-header">{movie.title}
            </div>
            <div className="rec-card-img"><img src={movie.poster} alt="poster" />
            </div>
            <div className="rec-card-header-left"><img className="rec-card-header-img"
                src={user_image} alt="profile" />
                <h3 className="rec-card-header-name">{first_name}</h3>
            </div>
                
            <button className="rec-card-rate" type="checkbox" default='none' onCLick={() => setAccepted(true)}>Accept Recommendation?</button>
            <button className="rec-card-rate" type="checkbox" default='none' onCLick={() => setAccepted(false)}>Decline Recommendation?</button>
            <p className="rec-card-comment">{comment}</p>
            
                
            <div className="rec-card-header-right">
                <button
                    className="rec-card-header-btn"
                    onClick={() => {
                        navigate("/profile/" + user._id);
                    }}
                >
                    View Profile
                </button>
            </div>
        </div>);
}

export default RecCard