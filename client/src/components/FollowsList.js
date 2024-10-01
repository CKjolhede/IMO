import React, { useState, useEffect } from "react";
import FollowCard from "./FollowCard";
// TODO: Add frame of suggested friends. Algo simply users 2 or 3 degrees of separation through current friends

function FollowsList({ handleRemoveFriend, handleAcceptFriend, handleFriendRequest, follows, followsUser}) {
    const [acceptedFollows, setAcceptedFollows] = useState([]);
    const [pendingFollows, setPendingFollows] = useState([]);
    const [requestedFollows, setRequestedFollows] = useState([]);
    
    useEffect(() => {
        setAcceptedFollows(follows?.filter((follow) => follow.status === 'accepted'));
        setPendingFollows(follows?.filter((follow) => follow.status === 'pending'));
        setRequestedFollows(follows?.filter((follow) => follow.status === 'requested'));
    }, [follows]);
    
    
    return (
        <div className="followcards-container">
            <div className="followcard-accepted-container">
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
            <div className="followcard-pending-container">
                {pendingFollows?.map((friend) => (
                    <FollowCard
                        key={friend.id}
                        handleRemoveFriend={handleRemoveFriend}
                        handleAcceptFriend={handleAcceptFriend}
                        handleFriendRequest={handleFriendRequest}
                        follow={friend}
                    />
                ))}
            </div>
            <div className="followcard-requested-container">
                {requestedFollows?.map((friend) => (
                    <FollowCard
                        key={friend.id}
                        handleRemoveFriend={handleRemoveFriend}
                        handleAcceptFriend={handleAcceptFriend}
                        handleFriendRequest={handleFriendRequest}
                        follow={friend}
                    />
                ))}
            </div>
        </div>
    ); 
}

export default FollowsList;
