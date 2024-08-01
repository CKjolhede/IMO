import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from './imo_logo.gif';



function Header() {
    const { user, logout } = useAuth();
    //const [ newuser, setNewUser] = useState(false);
    //const navigate = useNavigate();
    
    return (
        <div className="Header">
            {user ? (
                <div className="logged-in-header">
                    <img className="logo" src={logo} alt="logo" />

                    <Link to="/home" onClick={logout}>
                        Logout
                    </Link>
                </div>
            ) : (
                <div className="no-session-header">
                    <img className="logo" src={logo} alt="logo" />
                    <p className="header-text">IMO is the greatest</p>
                    <div className="login-links">
                        {<Link to="/home">Log In</Link>}
                        {/*<button className="button-login"
                                onClick={setNewUser(false)}></button>*/}
                    </div>
                    <div className="login-links">
                        <Link to="/home">Sign Up</Link>
                        {/*<button
                            className="button-login"
                            onClick={setNewUser(true)}
                        ></button>*/}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
