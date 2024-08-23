import React from "react";
import FollowCard from "./FollowCard";
// TODO: Add frame of suggested friends. Algo simply users 2 or 3 degrees of separation through current friends

function FollowsList({ handleRemoveFriend, handleAcceptFriend, handleFriendRequest, follows }) {
    return (

        <div className="FriendList">
            {follows?.map((friend) => (
                <FollowCard key={friend.id} handleRemoveFriend={handleRemoveFriend} handleAcceptFriend={handleAcceptFriend} handleFriendRequest={handleFriendRequest} follow={friend} />
            ))
            }
        </div>
    ) 
}


export default FollowsList;
