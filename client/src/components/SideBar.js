import React from "react";
import { NavLink } from "react-router-dom";


function SideBar() {

    return (
        <aside className="aside">
            <ul>
                <NavLink
                    to="/home/about"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    About
                </NavLink>
                <NavLink
                    to="/home/contact"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Contact
                </NavLink>
                <NavLink
                    to="/home/follows"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Friends
                </NavLink>
                <NavLink
                    to="/home/moviesearch"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Find Movies
                </NavLink>
                <NavLink
                    to="/home/userprofile/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Profile
                </NavLink>
                <NavLink
                    to="/home/movies"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Browse Movies
                </NavLink>
                <NavLink
                    to="/home/recommendations"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Recommendations
                </NavLink>
                {/*<NavLink to="/home/edituser" className={({ isActive }) => (isActive ? "active" : "")}>Edit User</NavLink>*/}
            </ul>
        </aside>
    );
    
}  


export default SideBar;