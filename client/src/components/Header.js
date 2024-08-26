import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from './imo_logo.gif'
import './Header.css';

function Header() {
    const { isLoggedIn, logout } = useAuth();
    
    return (
        <div>
            {isLoggedIn ? (
                <div className="header">
                    <Link to={"/home"}>
                        {<img className="logo" src={logo} alt="logo" />}
                    </Link>
                    <NavLink
                        to="/home/userprofile/"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Profile
                    </NavLink>
                    <Link
                        className="button-header-logout"
                        to="/home"
                        onClick={logout}
                    >
                        Logout
                    </Link>
                </div>
            ) : (
                <div className="header">
                    <Link to={"/home"}>
                        {<img className="logo" src={logo} alt="logo" />}
                    </Link>
                    <div className="button-header-login">
                        <Link
                            className="button-header"
                            to="/loginformcontainer"
                        >
                            Log In
                        </Link>

                        <Link className="button-header" to="registercontainer">
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
