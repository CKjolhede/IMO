import * as React from "react";
import { NavLink, Link} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from './imo_logo.gif';


function Header() {
    const { isLoggedIn, logout } = useAuth();
    
    return (
        <div className="Header">
            {isLoggedIn ? (
                <div className="logged-in-landing">
                    <img className="logo" src={logo} alt="logo" />
                    <div>
                        <h3>
                            <Link to="/" onClick={logout}>
                                Logout
                            </Link>
                        </h3>
                    </div>
                </div>
            ) : (
                <div className="No-session-landing">
                    <img className="logo" src={logo} alt="logo" />
                    IMO is the greatest
                    <div className="login-links">
                        <NavLink to="/loginform"><button className="button-login">Log In</button></NavLink>
                        
                        <NavLink to="/register"><button className="register-btn">Register</button></NavLink>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
