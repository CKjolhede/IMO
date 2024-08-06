import React from 'react';
import { NavLink } from 'react-router-dom';

function FollowCard({ following, status }) {
    return (
        <div className="follow-card">
            <NavLink to="/profile/<int:following_id>">
            <div className="follow-card-header">
                <div className="follow-card-header-left">
                    <img
                        className="follow-card-header-img"
                        src={following.image}
                        alt="profile pic"/>
                    <h3 className="follow-card-header-name">{following.first_name} {following.last_name}</h3>
                </div>
                    <div className="follow-card-header-right">
                        status                  <button className="follow-card-header-btn">Follow</button>
                </div>
                </div>
            </NavLink>
        </div>
    );
}    
export default FollowCard;