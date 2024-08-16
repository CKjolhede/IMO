import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import avatar from "./userDefault.png";
//import { useFriendUserRef } from "./useFriendUserRef";


function UserSearchCard({
    handleFriendRequest,
    friendUser
}) {
    const { user } = useAuth();
    const friendUserId = friendUser.id;
    const user_Id = user.id;
    const [searchState, setSearchState] = useState("");
    
    const handleRequest = () => {
        handleFriendRequest(friendUserId, user_Id);
        setSearchState("pending");
    };
        return (
            <div className="user-card">
                <img
                    className="follow-card-header-img"
                    src={avatar}
                    alt="profile pic"
                ></img>
                <div className="follow-card-header">
                    {friendUser.first_name} {friendUser.last_name}
                    <p>Friend Request:{searchState}</p>
                </div>
                <button
                    className="follow-card-header-btn"
                    onClick={handleRequest}                  >
                    Friend Request
                </button>
            </div>
        );
    }

export default UserSearchCard;
