import * as React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from './imo_logo.gif';



function Header() {
    const { user, logout } = useAuth();
    
    
    return (
        <div className="Header">
            
            {user ? (
                <div className="logged-in-header">
                    <img className="logo" src={logo} alt="logo" />
                    <div>
                        <h3>
                            <Link to="/home" onClick={logout}>
                                Logout
                            </Link>
                        </h3>
                    </div>
                </div>
            ) : (
                <div className="no-session-header">
                    <img className="logo" src={logo} alt="logo" />
                    <p className="header-text">IMO is the greatest</p>
                        <div className="login-links">
                            <Link to="/home/">Log In</Link>
                        </div>
                </div>
            )
}
        </div>
    )
}

export default Header;
