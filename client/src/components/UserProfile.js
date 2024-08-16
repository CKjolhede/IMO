import React from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import profilePic from './userDefault.png';

function UserProfile() {
    const { user } = useAuth();
    const navigate = useNavigate();


    return (
        <>
        <div className="Profile">
            <h1>Account Information</h1>
            <img className="profilePic" src ={profilePic} alt="profilePic" />
            <h2>{user.first_name} {user.last_name}</h2>
            <h2>{user.email}</h2>
            <h2>{user.phone}</h2>
            <h2>{user.zipcode}</h2>
            <button type="button" onClick={( user ) => navigate('/home/editUser')}>
                Update Profile
            </button>                        
        </div>
        </>
            
        //TODO : Add statistics to user profiles  (# of recommendations, # of friends, # of mutual friends, number of mutual recommendations
            
    );
};


export default UserProfile;