import React from "react";
//import EditUser from "./EditUser";
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


function Profile() {
    const { user } = useAuth();
    const navigate  = useNavigate();
    
    return (
        <div classname="Profile">
            <placeholder className="Profile-pic" src={user.image}></placeholder>
            <h1>Account Information</h1>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <h2>{user.phone}</h2>
            <h2>{user.zipcode}</h2>
            <button onClick={() => { navigate("/edituser/" + user.id) }}>
                Update Profile
            </button>
            {/*<EditUser user={user} />*/}
        </div>
    );
}

export default Profile;