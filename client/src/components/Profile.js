import React from "react";
import EditUser from "./EditUser";
import { BrowserRouter as Router,useNavigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


function Profile({ user }) {
    const { currentUser } = useAuth();
    const navigate  = useNavigate();
    
    return (
        <div classname="Profile">
            <h1>Profile</h1>
            <h2>{user.name}</h2>
            <h2>{currentUser.email}</h2>
            <h2>{user.phone}</h2>
            <h2>{user.zipcode}</h2>
            <button onClick={() => { navigate("/edituser/") }}>
                Update Profile
            </button>
            <EditUser user={user} />
        </div>
    );
}

export default Profile;