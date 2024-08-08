import React, { useEffect, useState } from "react";
import FollowCard from "./FollowCard";

async function getUser(following_id) {
    return await fetch("/users/" + following_id).then((response) =>
        response.json()
    );
}

function FollowsList({ friends, pendingFriends, requestedFriends }) {
    const [friendData, setFriendData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await Promise.all(
                friends.map(async (friend) => {
                    const response = await getUser(friend.following_id);
                    return { ...friend, ...response };
                })
            );
            setFriendData(data);
        }
        fetchData();
    }, [friends]);

    return (
        <div className="FriendList">
            {friendData.map((friend) => (
                <FollowCard key={friend.id} friendprop={friend} />
            ))}
        </div>
    );
}

export default FollowsList;
