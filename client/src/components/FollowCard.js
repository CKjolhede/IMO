import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function FollowCard({ friendprop }) {
    const [friend, setFriend] = useState({});
    useEffect(() => {
        const friendById = async () => {
            const response = await fetch("/users/" + friendprop.following_id);
            if (response.ok) {
                const friend = await response.json();
                setFriend(friend);
            }
        };
        friendById();
    }, [friendprop.following_id]);
    

    return (
        <NavLink to={`/profile/${friend.id}`} className="follow-card-link">
            <div className='follow-card' >
                <div className="follow-card-header">
                    <div className="follow-card-header-left">
                        <img
                            className="follow-card-header-img"
                            src={friend.image}
                            alt="profile pic"></img> 
                        {friend.first_name} {friend.last_name}
                    </div>
                    {/*<div className="follow-card-header-right">
                        <button className="follow-card-header-btn">Follow</button>
                    </div>*/}
                </div>
            </div>
        </NavLink>
    );
}    
export default FollowCard;