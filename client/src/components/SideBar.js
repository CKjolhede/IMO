import React from "react";
import { useNavigate } from "react-router-dom";

function SideBar() {
    const navigate = useNavigate();
    
    return (
        <>
            <button
                className="sidebar-btn"
                onClick={() => {
                    navigate("/makeRec");
                }}
            >Make a Recommendation
            </button>
            
            <button
                className="sidebar-btn"
                onClick={() => {
                    navigate("/registercontainer");
                }}
            >
                View Recommendations
            </button>
            
            
            <button
                className="sidebar-btn"
                onClick={() => {
                    navigate("/follows");
                }}
            >
                View Friends
            </button>
            
            
            <button
                className="sidebar-btn"
                onClick={() => {
                    navigate("/carousel");
                }}
            >
                Rate Movies
            </button>
            
            
            <button
                className="sidebar-btn"
                onClick={() => {
                    navigate("/edituser/");
                }}
            >
                Account Settings
            </button>  
            
            <button
                className="sidebar-btn"
                onClick={() => {
                    navigate("/about/");
                }}
            >
                About IMO
            </button>
            
            <button
                className="sidebar-btn"
                onClick={() => {
                    navigate("/contact");
                }}
            >
                Contact US
            </button>
        </>
    );
}

export default SideBar;