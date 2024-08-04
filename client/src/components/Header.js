import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from './imo_logo.gif'
import "./Header.css";

function Header() {
    const { isLoggedIn, logout } = useAuth();
    
    return (
        <div className="header">
            { isLoggedIn ? (
                <div className="header">
                    <Link to={"/"}>
                        {<img className="logo" src={logo} alt="logo" />}
                    </Link>
                    <Link className="button-header" to="/" onClick={logout}>
                        Logout
                    </Link>
                </div>
            ) : (
                <div className="header">
                    <Link to={"/"}>
                        {<img className="logo" src={logo} alt="logo" />}
                    </Link>

                    <div className="button-header">
                        {<Link to="/loginformcontainer">Log In</Link>}
                    </div>
                    <div className="button-header">
                        <Link to="registercontainer">Sign Up</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
