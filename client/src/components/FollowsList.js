import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import FollowCard from "./FollowCard";
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
            <h1>Friends</h1>
            <div>
                {acceptedFollows?.map((friend) => (
                    <FollowCard
                        key={friend.id}
                        handleRemoveFriend={handleRemoveFriend}
                        handleAcceptFriend={handleAcceptFriend}
                        handleFriendRequest={handleFriendRequest}
                        follow={friend}
                    />
                ))}
            </div>
            <ul>
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
            <ul>
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
