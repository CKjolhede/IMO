import React, { useState,useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import profilePic from './userDefault.png';

function Profile() {
    const { user } = useAuth();
    const { friendUserId } = useParams();
    console.log(friendUserId);
    const [friendUser, setFriendUser] = useState(null);
    const navigate = useNavigate();
    
    
    
    useEffect(() => {
        const getFriendUser = async () => {
            try {
                const response = await fetch("/users/" + friendUserId)
                const data = await response.json();
                setFriendUser(data);
            }
            catch (error) {
                console.error('Unable to fetch friend user:', error);
            }
        
        }   
        getFriendUser();
    }, [friendUserId]
    );
    
    if (!friendUser) {
        return <div>Loading...</div>;
    }
    
    return (
        <>
        <div className="Profile">
            <h1>Account Information</h1>
            <img className="profilePic" src ={profilePic} alt="profilePic" />
            <h2>{friendUser.first_name} {friendUser.last_name}</h2>
            <h2>{friendUser.email}</h2>
            <h2>{friendUser.phone}</h2>
            <h2>{friendUser.zipcode}</h2>                        
        </div>
        </>
            
        //TODO : Add statistics to user profiles  (# of recommendations, # of friends, # of mutual friends, number of mutual recommendations
            
    );
};


export default Profile;