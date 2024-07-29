import React from "react";
import { BrowserRouter as Router, Route, NavLink, Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";

function SideBar() {
    const { auth, logout, currentUser } = useAuth();
    const history = useHistory();
    return (
        <>SIDEBAR
            <div className="sidebar">
                <button
                    className="sidebar-btn"
                    onClick={() => {
                        history.push("/makerec/");
                    }}
                >
                    Make a Recommendation
                </button>
                ;
                <button
                    className="sidebar-btn"
                    onClick={() => {
                        history.push("/viewrec");
                    }}
                >
                    View Recommendations
                </button>
                ;
                <button
                    className="sidebar-btn"
                    onClick={() => {
                        history.push("/friends");
                    }}
                >
                    Friends
                </button>
                ;
                <button
                    className="sidebar-btn"
                    onClick={() => {
                        history.push("/carousel");
                    }}
                >
                    Browse Movies
                </button>
                ;
                <button
                    className="sidebar-btn"
                    onClick={() => {
                        ("/edituser/");
                    }}
                >
                    Account Settings
                </button>
            </div>
        </>
    );
}

export default SideBar;
