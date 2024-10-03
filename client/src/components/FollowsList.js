import React, { useState, useEffect } from "react";
import FollowCard from "./FollowCard";
// TODO: Add frame of suggested friends. Algo simply users 2 or 3 degrees of separation through current friends

function FollowsList({ handleRemoveFriend, handleAcceptFriend, handleFriendRequest, follows }) {
    const [acceptedFollows, setAcceptedFollows] = useState([]);
    console.log("accepted follows", acceptedFollows);
    const [pendingFollows, setPendingFollows] = useState([]);
    console.log("pending follows", pendingFollows);
    const [requestedFollows, setRequestedFollows] = useState([]);
    console.log("requested follows", requestedFollows);

    
    useEffect(() => {
        setAcceptedFollows(follows?.filter((follow) => follow.status === 'accepted'));
        setPendingFollows(follows?.filter((follow) => follow.status === 'pending'));
        setRequestedFollows(follows?.filter((follow) => follow.status === 'requested'));
    }, [follows]);
    
    
    return (
        <>
            <ul>
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

            <ul>
            {pendingFollows?.map((friend) => (
                    <FollowCard
                        key={friend.id}
                        handleRemoveFriend={handleRemoveFriend}
                        handleAcceptFriend={handleAcceptFriend}
                        handleFriendRequest={handleFriendRequest}
                        follow={friend}
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
                    />
                ))}
            </ul>
        </>
    ); 
}

export default FollowsList;
