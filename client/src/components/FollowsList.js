import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import FollowCard from "./FollowCard";
import defaultProfilePic from "./images/imo_emu.png";
// TODO: Add frame of suggested friends. Algo simply users 2 or 3 degrees of separation through current friends

function FollowsList({ handleRemoveFriend, handleAcceptFriend, handleFriendRequest, follows }) {
    const [acceptedFollows, setAcceptedFollows] = useState([]);
    const [pendingFollows, setPendingFollows] = useState([]);
    const [requestedFollows, setRequestedFollows] = useState([]);

    const { user } = useAuth();

    
    useEffect(() => {
        setAcceptedFollows(follows?.filter((follow) => follow.status === 'accepted'));
        setPendingFollows(follows?.filter((follow) => follow.status === 'pending'));
        setRequestedFollows(follows?.filter((follow) => follow.status === 'requested'));
    }, [follows]);
    
    
    return (
        <>
            
            <ul className="follow-list-accepted">
                <h1>{"Your " + acceptedFollows?.length + " Friends"}</h1>
                {acceptedFollows?.map((friend) => (
                    <FollowCard
                        key={friend.id}
                        handleRemoveFriend={handleRemoveFriend}
                        handleAcceptFriend={handleAcceptFriend}
                        handleFriendRequest={handleFriendRequest}
                        follow={friend}
                    />
                ))}
            </ul>
            <ul className="follow-list-pending">
                <h1>Requested Connections</h1>
                {pendingFollows?.map((friend) => (
                    <FollowCard
                        key={friend.id}
                        handleRemoveFriend={handleRemoveFriend}
                        handleAcceptFriend={handleAcceptFriend}
                        handleFriendRequest={handleFriendRequest}
                        follow={friend}
                        isFollower={friend.follower_id === user.id}
                    />
                ))}
            </ul>
            <ul className="follow-list-requested">
                <h1>Pending Connections</h1>
                {requestedFollows?.map((friend) => (
                    <FollowCard
                        key={friend.id}
                        handleRemoveFriend={handleRemoveFriend}
                        handleAcceptFriend={handleAcceptFriend}
                        handleFriendRequest={handleFriendRequest}
                        follow={friend}
                        isFollower={friend.follower_id === user.id}
                    />
                ))}
            </ul>
        </>
    ); 
}

export default FollowsList;
