import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function FollowCard({ handleRemoveFriend, handleAcceptFriend, handleFriendRequest, friendUser }) {
    const { user } = useAuth();
    if (friendUser.status === 'rejected') {
        return (null)
    }
    else if (friendUser.status === 'accepted') {
        return (
            <div className='follow-card' >
                <NavLink to={`/profile/${friendUser.id}`} className="follow-card-link">
                    <img
                        className="follow-card-header-img"
                        src={friendUser.image}
                        alt="profile pic"></img>
                </NavLink>
                <div className="follow-card-header">
                    {friendUser.first_name} {friendUser.last_name}
                </div>
                <button className="follow-card-header-btn" onClick={() => { handleRemoveFriend(friendUser.id, user.id) }}>Unfriend</button>    
            </div>)
    }
    else if (friendUser.status === 'requested') {
        return (
            <div className='follow-card' >
                <NavLink to={`/profile/${friendUser.id}`} className="follow-card-link">
                    <img
                        className="follow-card-header-img"
                        src={friendUser.image}
                        alt="profile pic"></img>
                </NavLink>
                <div className="follow-card-header">
                    {friendUser.first_name} {friendUser.last_name}
                </div>
                <button className="follow-card-header-btn" onClick={() => { handleAcceptFriend(friendUser.id, user.id) }}>Accept</button> 
                <button className="follow-card-header-btn" onClick={() => { handleRemoveFriend(friendUser.id, user.id) }}>Decline</button>                
            </div>
        )
    }
    else if (friendUser.status === 'pending') {                 
        return (
            <div className='follow-card' >
                <NavLink to={`/profile/${friendUser.id}`} className="follow-card-link">
                    <img
                        className="follow-card-header-img"
                        src={friendUser.image}
                        alt="profile pic"></img>
                </NavLink>
                <div className="follow-card-header">
                    {friendUser.first_name} {friendUser.last_name}
                </div>
                <button className="follow-card-header-btn" onClick={() => { handleRemoveFriend(friendUser.id, user.id) }}>Cancel</button>                
            </div>
        )
    }
    else {
        return (
            <div className='follow-card' >
                <NavLink to={`/profile/${friendUser.id}`} className="follow-card-link">
                    <img
                        className="follow-card-header-img"
                        src={friendUser.image}
                        alt="profile pic"></img>
                </NavLink>
                <div className="follow-card-header">
                    {friendUser.first_name} {friendUser.last_name}
                </div>
                <button className="follow-card-header-btn" onClick={() => { handleFriendRequest(friendUser.id, user.id) }}>Friend Request</button>                
            </div>
        )
    }
}    
export default FollowCard;