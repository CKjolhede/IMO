//components/Follows.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import FollowsList from './FollowsList';
import UserSearch from './UserSearch';
import defaultProfilePic from "./images/imo_emu.png";

function Follows() {
    const { user } = useAuth();
    const [follows, setFollows] = useState([]);

    useEffect(() => {
        const fetchFollows = async () => {
            try {
                const response = await fetch('/follows/' + user.id, { method: 'GET' });
                if (response.ok) {
                    const data = await response.json();
                    setFollows(data);                
                } else {
                    console.error('Failed to fetch follows:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching follows:', error);
                }
        };      
        fetchFollows();
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
            response.ok ? 
                setFollows(follows?.map((follow) => follow.following_id !== updatedFriend.id))
                : console.error("Failed to accept friend")
                setFollows([updatedFriend, ...follows]);
            
        }
        catch (error) {
            console.error("Failed to accept friend");
        }
    };
    
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
            const data = await response.json();
            setFollows([data, ...follows]);
            //setName(name);
        }
        catch (error) {
            console.error("Failed to send friend request", error);
        }
    };
        
        return (
            <>
                {/*<div className="follow-search">
                    <h2>Search for Friends
                    <UserSearch       
                        handleFriendRequest={handleFriendRequest}
                    /></h2>
                </div>*/}
                {/*<h1 className="page-title"> Friends</h1>*/}
                {/*<h1 className="page-title-follow">
                    <img src={defaultProfilePic} alt="ProfileImage" />
                    {user.first_name}
                </h1>*/}
                <h1 className="page-title-userprofile">
                    <img src={defaultProfilePic} alt="ProfileImage" />
                    {user.first_name}
                </h1>
                <div className="follow-container">
                    <div className="follow-search">
                        <h2>
                            Search for Friends
                            <UserSearch
                                handleFriendRequest={handleFriendRequest}
                            />
                        </h2>
                    </div>
                    <FollowsList
                        handleFriendRequest={handleFriendRequest}
                        handleRemoveFriend={handleRemoveFriend}
                        handleAcceptFriend={handleAcceptFriend}
                        follows={follows}
                    />
                </div>
            </>
        );
    
}
export default Follows;