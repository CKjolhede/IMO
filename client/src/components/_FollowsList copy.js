import React, { useEffect, useState } from "react";
import FollowCard from "./FollowCard";
// TODO: Add frame of suggested friends. Algo simply users 2 or 3 degrees of separation through current friends


async function getUser(following_id) {
    return await fetch("/users/" + following_id).then((response) =>
        response.json()
    );
}

function FollowsList({ handleRemoveFriend, handleAcceptFriend, handleFriendRequest, friends }) {
    const [friendData, setFriendData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await Promise.all(
                friends?.map(async (friend) => {
                    const response = await getUser(friend.following_id);
                    return { ...friend, ...response };
                })
            );
        
            console.log(data)
            setFriendData(data.flat());
            }
        fetchData();

    }, [friends]);

    return (
        <div className="FriendList">
            {friendData?.map((friend) => (
                <FollowCard key={friend.id}  handleFriendRequest={handleFriendRequest} handleRemoveFriend={handleRemoveFriend} handleAcceptFriend = {handleAcceptFriend} friendUser={friend} />
            ))}
        </div>
    );
}


export default FollowsList;
