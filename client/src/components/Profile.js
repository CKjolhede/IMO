import React from "react";
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import profilePic from './userDefault.png';


function Profile() {
    const { user } = useAuth();
    const navigate  = useNavigate();
    
    return (
        <div className="Profile">
            <h1>Account Information</h1>
            <img className="profilePic" src ={profilePic} alt="profilePic" />
            <h2>{user.first_name} {user.last_name}</h2>
            <h2>{user.email}</h2>
            <h2>{user.phone}</h2>
            <h2>{user.zipcode}</h2>
            <button onClick={() => { navigate(".../home/edituser/") }}>
                Update Profile
            </button>
        </div>
    );
}

export default Profile;