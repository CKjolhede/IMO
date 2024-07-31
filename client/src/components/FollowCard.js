import React from 'react';
import { useNavigate } from 'react-router-dom';

function FollowCard({ follow }) {
    const navigate = useNavigate();
    return (
        <div className="follow-card">
            <div className="follow-card-header">
                <div className="follow-card-header-left">
                    <img
                        className="follow-card-header-img"
                        src={follow.profilePic}
                        alt="profile"
                    />
                    <h3 className="follow-card-header-name">{follow.name}</h3>
                </div>
                <div className="follow-card-header-right">
                    <button
                        className="follow-card-header-btn"
                        onClick={() => {
                            navigate("/profile/" + follow._id);
                        }}
                    >
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
}    
export default FollowCard