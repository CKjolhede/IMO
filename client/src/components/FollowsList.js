import React, { useEffect, useState } from "react";
import FollowCard from "./FollowCard";

async function getUser(following_id) {
    return await fetch("/users/" + following_id).then((response) =>
        response.json()
    );
}

function FollowsList({ props }) {
    const [friendData, setFriendData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await Promise.all(
                props.map(async (prop) => {
                    return Promise.all(
                        prop.map(async (friend) => {
                            const response = await getUser(friend.following_id);
                            return { ...friend, ...response };
                        })
                    );
                })
            );
        
            setFriendData(data.flat());
            console.log(data);
        }
        fetchData();
    }, [props]);

    return (
        <div className="FriendList">
            {friendData.map((friend) => (
                <FollowCard key={friend.id} friendprop={friend} />
            ))}
        </div>
    );
}

export default FollowsList;
