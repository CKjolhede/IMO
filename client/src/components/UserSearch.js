import React, { useState } from "react";
import axios from "axios";
import UserSearchCard from "./UserSearchCard";

const UserSearch = ({handleFriendRequest}) => {
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState([]);

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
                    <UserSearchCard key={user.id}
                        handleFriendRequest={handleFriendRequest} friendUser={user} />
                ))}
            </ul>
        </div>
    );
    };

export default UserSearch;