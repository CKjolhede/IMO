import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useAuth } from '../contexts/AuthContext';
import imo_emu from "./images/imo_emu.png";


function FollowCard({ handleRemoveFriend, handleAcceptFriend, handleFriendRequest, follow, pendingFollows, acceptedFollows, requestedFollows }) {
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
                <li >
                    <img className="follow-picture"
                        src={imo_emu}
                        alt="profile pic"/>
                    
                    <div className="follow-header">
                        {friendUser.first_name} {friendUser.last_name}
                    </div>
                    
                    <button
                        className="follow-button"
                        onClick={() => {handleRemoveFriend(follow.id);}}> 
                        Unfriend
                    </button>
                </li>
            );
        }
        else if (follow.status === 'requested') {
            return (
                <li >
                    <img className="follow-picture"
                        src={profilePic}
                        alt="profile pic"/>

                    <div className="follow-header">
                        {friendUser.first_name} {friendUser.last_name}
                    </div>
                    
                    <button className="follow-button"
                        onClick={() => {
                            handleAcceptFriend(follow.id);}}>
                        Accept
                    </button>
                    
                    <button className="follow-button"
                        onClick={() => {handleRemoveFriend(follow.id);}}>
                        Decline
                    </button>
                </li>
            );
        }
        else if (follow.status === 'pending') {

            return (
                <li >
                    <img
                        className="follow-picture"
                        src={imo_emu}
                        alt="profile pic" />
                    
                    <h2 className="follow-header">
                        {friendUser.first_name} {friendUser.last_name}
                    </h2>
                    
                    <button className="follow-button"
                            onClick={() => {
                                handleRemoveFriend(follow.id);}}>
                            Cancel Request
                    </button>
                </li>
            );
        }
        else {
            return (
                <li >
                    <img className="follow-picture"
                        src={imo_emu}
                        alt="profile pic"/>
                    
                    <h2 className="follow-header">
                        {friendUser.first_name} {friendUser.last_name}</h2>
                    
                    <button
                        className="card button"
                        onClick={() => {handleFriendRequest(friendUser.id, user.id);}}>                    
                        Request Friendship
                    </button>
                </li>
            );
        }
    }

export default FollowCard;
    
    