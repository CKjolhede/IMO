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
                className="reg-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
                placeholder="Search by name"
            />
            <button style={{visibility: "hidden"}}
                onClick={handleSearch}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
            >
            </button>
            <div >
                {users?.map((user) => (
                    <UserSearchCard
                        key={user.id}
                        handleFriendRequest={handleFriendRequest}
                        friendUser={user}
                    />
                ))}
            </div>
        </div>
    );
    };

export default UserSearch;