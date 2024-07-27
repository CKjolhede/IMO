import React from "react";
import { BrowserRouter as Router, Route, NavLink, Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function RecList() {
    const { auth, logout, currentUser } = useAuth();

    return (
        <div className="RecList">
            <h1>Recommendations</h1>
            {/*///write list iteration here*/}
            
            <ul>
                <li>Rec 1</li>
                <li>Rec 2</li>
                <li>Rec 3</li>
            </ul>
        </div>
    );
}

export default RecList;
