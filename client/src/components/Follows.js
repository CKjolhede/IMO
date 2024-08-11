import React, { useState, useEffect } from 'react';
import SearchUsers from './SearchUsers';

import { useAuth } from '../contexts/AuthContext';
import FollowsList from './FollowsList';

function Follows() {
    const { user } = useAuth();
    const [follows, setFollows] = useState([]);
    

    useEffect(() => {
        fetch('/follows/' + user.id, { method: 'GET' })
            .then(res => res.json())
            .then(data => setFollows(data));
    }, [user.id]);

    
    const handleRemoveFriend = async (friendUserId, userId) => {
        const response = await fetch('/follows/' + userId + '/' + friendUserId, { method: 'DELETE' });
        response.ok ? onRemove(friendUserId) : console.error("Failed to remove friend")
    }
        
    const onRemove = (id) => {
        console.log(follows)
        setFollows(follows.filter((follow) => follow.following_id !== id));
    }

    
    const handleAcceptFriend = async (friendUserId, user_id) => {
        try {
            const response = await fetch(
                "/follows/" + user_id + "/" + friendUserId,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "accepted" }),
                });
            if (response.ok) {
                const updatedFollow = await response.json();
                setFollows(
                    follows?.map((follow) =>
                        follow.id === updatedFollow.id ? updatedFollow : follow
                    ));
            }
        }
        catch (error) {
            console.error("Failed to accept friend");
        }
    }
    
    const handleFriendRequest = async (friendUserId, user_id,) => {
        try {
            console.log(friendUserId, user_id);
            const response = await fetch(
                "/follows/" + user_id, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    following_id: friendUserId,
                    follower_id: user_id,
                    status: "pending",
                }),
            });
            if (response.ok) {
                const newFollow = await response.json();
                console.log(newFollow);
                setFollows(newFollow, ...follows);
            } 
        }
        catch (error) 
                {console.error("Failed to send friend request"); }
        }
        return (
            <>
                <div>
                    <h2>Search for Friends</h2>
                    <SearchUsers handleRemoveFriend={handleRemoveFriend} handleAcceptFriend={handleAcceptFriend} handleFriendRequest={handleFriendRequest} />
                </div>
                <h1>Friends</h1>
                <div>
                    <FollowsList handleRemoveFriend={handleRemoveFriend} handleAcceptFriend={handleAcceptFriend} handleFriendRequest={handleFriendRequest} friends={follows} />
                </div>
            </>
        );
    }

export default Follows;