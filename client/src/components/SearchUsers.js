import React, { useState } from "react";
import axios from "axios";
import FollowCard from "./FollowCard";

const SearchUsers = ({handleRemoveFriend, handleAcceptFriend, handleFriendRequest}) => {
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState([]);
    //const [searchParams, setSearchParams] = useSearchParams();

    const handleSearch = async () => {
        try {
            const response = await axios.get('/users/search', {params: {name}});
            setUsers(response.data);
        } catch (error) {
            setErrors(error, ...errors)
            console.error('Unable to fetch users:', error);
        }
    };
    

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Search by name"
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {users?.map((user) => (
                    <FollowCard key={user.id} handleRemoveFriend={handleRemoveFriend} handleAcceptFriend={handleAcceptFriend} handleFriendRequest={handleFriendRequest} friendUser={user} />
                ))}
            </ul>
        </div>
    );
    };

export default SearchUsers;
    
    //const friendRequest = async (friendUser_id, user_id) => {
    //    try {
    //        const response = await fetch("/follows/" + user_id, {
                
    //            method: "POST",
    //            headers: {
    //                "Content-Type": "application/json",
    //            },
    //            body: JSON.stringify(
    //                {
    //                    following_id: friendUser_id,
    //                    follower_id: user_id,
    //                    status: "pending"
    //                }
    //            )
    //        });
    //        if (response.ok) {
    //            navigate("/home/");
    //        } else {
    //            const errorData = await response.json();
    //            setErrors(errorData, ...errors);
    //        }
    //    } catch (error) {
    //        setErrors([
    //            {
    //                message:
    //                    "You have entered an invalid information.",
    //            },...errors
    //        ]);
    //    }
    //};