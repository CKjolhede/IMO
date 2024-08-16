import React, {useEffect, useState} from 'react';

import { useAuth } from '../contexts/AuthContext';
import avatar from "./userDefault.png";

async function getFriendUser(following_id) {
        await fetch("/users/" + following_id)
        .then((response) =>
                response.json()
        );
}
function FollowCard({ handleRemoveFriend, handleAcceptFriend, handleFriendRequest, follow }) {
    const { user } = useAuth();
    const [friendUser, setFriendUser] = useState({null: null});
    
    useEffect(() => {
        const fetchData = async () =>
        {
            const data = await getFriendUser(follow.following_id);
            setFriendUser(data);
        }
        fetchData();
    }, [follow.following_id]);
    
    if (follow.status === 'rejected') {
        return (null)
    }
    else if (follow.status === 'accepted') {
        return (
            <div className='follow-card' >
            
                    <img
                        className="follow-card-header-img"
                        src={avatar}
                        alt="profile pic"></img>
                <div className="follow-card-header">
                    {friendUser.first_name} {friendUser.last_name}
                </div>
                <button className="follow-card-header-btn" onClick={() => { handleRemoveFriend(follow.id) }}>Unfriend</button>    
            </div>)
    }
    else if (follow.status === 'requested') {
        return (
            <div className="follow-card">
                    className="follow-card-link"
                
                    <img
                        className="follow-card-header-img"
                        src={friendUser.image}
                        alt="profile pic"
                    ></img>

                <div className="follow-card-header">
                    {friendUser.first_name} {friendUser.last_name}
                </div>
                <button
                    className="follow-card-header-btn"
                    onClick={() => {
                        handleAcceptFriend(follow.id);
                    }}
                >
                    Accept
                </button>
                <button
                    className="follow-card-header-btn"
                    onClick={() => {
                        handleRemoveFriend(follow.id);
                    }}
                >
                    Decline
                </button>
            </div>
        );
    }
    else if (follow.status === 'pending') {

        return (
            <div className="follow-card">
                <img
                    className="follow-card-header-img"
                    src={avatar}
                    alt="profile pic"
                ></img>
                <h2>
                    {friendUser.first_name} {friendUser.last_name}
                </h2>
                <h3>{friendUser.email}</h3>
                <h3>{friendUser.phone}</h3>
                <button
                    className="follow-card-header-btn"
                    onClick={() => {
                        handleRemoveFriend(follow.id);
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    }
    else {
        return (
            <div className="follow-card">
                <img
                    className="follow-card-header-img"
                    src={friendUser.image}
                    alt="profile pic"
                />
                <h2>
                    {friendUser.first_name} {friendUser.last_name}
                </h2>
                <h3>{friendUser.email}</h3>
                <button
                    className="follow-card-header-btn"
                    onClick={() => {
                        handleFriendRequest(friendUser.id, user.id);
                    }}
                >
                    Friend Request
                </button>
            </div>
        );
    }
}    
export default FollowCard;