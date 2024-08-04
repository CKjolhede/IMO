import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from './imo_logo.gif'

function Header() {
    const { user, logout } = useAuth();
    
    return (
        <div className="header">
            {user ? (
                <div className="header-in">
                    <Link to={"/"}>
                        {<img className="logo" src={logo} alt="logo" />}
                    </Link>
                    <Link className="button-logout" to="/" onClick={logout}>
                        Logout
                    </Link>
                </div>
            ) : (
                <div className="header-in">
                    <Link to={"/"}>
                        {<img className="logo" src={logo} alt="logo" />}
                    </Link>
                    <p className="header-text">IMO is the greatest</p>
                    <div className="button-login">
                        {<Link to="/">Log In</Link>}
                    </div>
                    <div className="button-signup">
                        <Link to="/">Sign Up</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
