import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import imo_emu from "./images/imo_emu.png";
function UserSearchCard({
    handleFriendRequest,
    friendUser
}) {
    const { user } = useAuth();
    const friendUserId = friendUser.id;
    const userId = user.id;
    //const [searchState, setSearchState] = useState("");
    const handleRequest = () => {
        handleFriendRequest(friendUserId, userId);
        //setSearchState("pending");
    };
        return (
            <div className="card">
                <img
                    src={imo_emu}
                    alt="profile pic"
                ></img>
                <div className="follow-card-header">
                    {friendUser.first_name} {friendUser.last_name}
                </div>
                <button
                    onClick = {handleRequest}>
                    Friend Request
                </button>
            </div>
        );
    }

export default UserSearchCard;
