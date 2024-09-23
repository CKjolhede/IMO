import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useAuth } from '../contexts/AuthContext';
import imo_emu from "./images/imo_emu.png";


function FollowCard({ handleRemoveFriend, handleAcceptFriend, handleFriendRequest, follow }) {
    const { user } = useAuth();
    const profilePic = { imo_emu }
    const [friendUser, setFriendUser] = useState("");
    
        useEffect(() => {
            
        const once = async (id) => {
        await axios.get("/users/" + id).then((response) => {    
            setFriendUser(response.data);
        }); 
    } 
    if (!friendUser) { once(follow.following_id) }
        })

        if (follow.status === 'rejected') {
            return (null)
        }
        else if (follow.status === 'accepted') {
            return (
                <div className="follow-card">
                    <img className="card-user-img"
                        src={profilePic}
                        alt="profile pic"
                    ></img>
                    <div className="follow-card-header">
                        <h2>
                            {friendUser.first_name} {friendUser.last_name}
                        </h2>
                        <h3>{friendUser.email}</h3>
                        <h3>{friendUser.phone}</h3>
                    </div>
                    <button
                        className="follow-card-header-btn"
                        onClick={() => {
                            handleRemoveFriend(follow.id);
                        }}
                    >
                        Unfriend
                    </button>
                </div>
            );
        }
        else if (follow.status === 'requested') {
            return (
                <div className="follow-card">
                    <img
                        className="follow-card-profile-pic"
                        src={profilePic}
                        alt="profile pic"
                    ></img>

                    <div className="follow-card-header">
                        {friendUser.first_name} {friendUser.last_name}
                    </div>
                    <button
                        className="follow-card-header-btn"
                        onClick={() => {
                            handleAcceptFriend(follow.id);
                        }}
                    >
                        Accept
                    </button>
                    <button
                        className="follow-card-header-btn"
                        onClick={() => {
                            handleRemoveFriend(follow.id);
                        }}
                    >
                        Decline
                    </button>
                </div>
            );
        }
        else if (follow.status === 'pending') {

            return (
                <div className="follow-card">
                    <img
                        className="card-profile-pic"
                        src={profilePic}
                        alt="profile pic"
                    ></img>
                    <h2>
                        {friendUser.first_name} {friendUser.last_name}
                    </h2>
                    <h3>{friendUser.email}</h3>
                    <h3>{friendUser.phone}</h3>
                    <h3>
                        Friend Request Pending
                        <button
                            className="follow-card-header-btn"
                            onClick={() => {
                                handleRemoveFriend(follow.id);
                            }}
                        >
                            Cancel
                        </button>
                    </h3>
                </div>
            );
        }
        else {
            return (
                <div className="follow-card">
                    <img
                        style={{ width: "100px", height: "100px" }}
                        className="card"
                        src={profilePic}
                        alt="profile pic"
                    />
                    <h2>
                        {friendUser.first_name} {friendUser.last_name}
                    </h2>
                    <h3>{friendUser.email}</h3>
                    <button
                        className="card button"
                        onClick={() => {
                            handleFriendRequest(friendUser.id, user.id);
                        }}
                    >
                        Request Friendship
                    </button>
                </div>
            );
        }
    }

export default FollowCard;
    
    