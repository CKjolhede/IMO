import React from "react";
import {  useNavigate } from "react-router-dom"
//import { useAuth } from "../contexts/AuthContext";

function SideBar() {
    
    const navigate = useNavigate();
    return (
        <>SIDEBAR
            <div className="sidebar">
                <button
                    className="sidebar-btn"
                    onClick={() => {
                        navigate("/makerec/");
                    }}
                >
                    Make a Recommendation
                </button>
                ;
                <button
                    className="sidebar-btn"
                    onClick={() => {
                        navigate("/viewrec");
                    }}
                >
                    View Recommendations
                </button>
                ;
                <button
                    className="sidebar-btn"
                    onClick={() => {
                        navigate("/follows");
                    }}
                >
                    Follows
                </button>
                ;
                <button
                    className="sidebar-btn"
                    onClick={() => {
                        navigate("/carousel");
                    }}
                >
                    Browse Movies
                </button>
                ;
                <button
                    className="sidebar-btn"
                    onClick={() => {
                        navigate("/edituser/");
                    }}
                >
                    Account Settings
                </button>
            </div>
        </>
    );
}

export default SideBar;
