import React, { useState, useEffect } from 'react';
import SearchUsers from './SearchUsers';
import { useAuth } from '../contexts/AuthContext';
import FollowsList from './FollowsList';
import setUsers from './SearchUsers';


function Follows() {
    const { user } = useAuth();
    const [follows, setFollows] = useState([]);

    useEffect(() => {
        try {
            const response = async () => await fetch('/follows/' + user.id, { method: 'GET' });
            if (response.ok) {
                const data = response.json();
                console.log(data)
                setFollows(data);
            }
        }
        catch (error) {
            console.error('Unable to fetch follows:', error);
        }
    }, [user.id]);


    const handleRemoveFriend = async (follows_Id) => {
        const response = await fetch('/follows/' + follows_Id, { method: 'DELETE' });

        response.ok ? onRemove(follows_Id) : console.error("Failed to remove friend")
    }
        
    const onRemove = (id) => {
        setFollows(follows?.filter((follow) => follow.id !== id)
        );
    }

    
    const handleAcceptFriend = async (follows_id) => {
        try {

            const response = await fetch(
                "/follows/" + follows_id,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "accepted" }),
                });
            const updatedFriend = await response.json();
            response.ok ? onAccept(updatedFriend) : console.error("Failed to accept friend")
        
        }
        catch (error) {
            console.error("Failed to accept friend");
        }
    };
    
    const onAccept = (updatedFriend) => {
        setFollows(follows?.map((follow) => follow.following_id === updatedFriend.id ? updatedFriend : follow));
    }
    
    const handleFriendRequest = async (friendUserId, user_id) => {
        try {
            const response = await fetch(
                "/follows/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "following_id": friendUserId,
                    "follower_id": user_id,
                    status: "pending",
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = response.json();
            setFollows([data, ...follows]);
            setUsers([]);
        }
        catch (error) {
            console.error("Failed to send friend request", error);
        }};
    
        
        return (
            <>
                <div>
                    <h2>Search for Friends</h2>
                    <SearchUsers
                        handleFriendRequest={handleFriendRequest}
                    />
                </div>
                <div>
                <h1>Friends</h1>
                    <FollowsList
                        handleFriendRequest={handleFriendRequest}
                        handleRemoveFriend={handleRemoveFriend}
                        handleAcceptFriend={handleAcceptFriend}
                        friends={follows}
                    />
                </div>
            </>
        );
    
}
export default Follows;