import * as React from "react";
import { BrowserRouter as Router, Route, useHistory, NavLink, Link} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function Header({ setUser, user }) {
    const { currentUser, auth, logout } = useAuth();
    
    return (
        <div className="Header">
            {auth.isLoggedIn ? (
                <div className="logged-in-landing">
                    <h1>IMO</h1>
                    <div id="links">
                        <h3>
                            <Link to="/" onClick={logout}>
                                Logout
                            </Link>
                        </h3>
                    </div>
                    <button onClick={() => { ("/edituser/") }}>
                        Edit Profile
                    </button>
                </div>
            ) : (
                <div className="no-session-landing">
                    <h1>IMO</h1>
                    <div className="links">
                        <NavLink to="/loginform" className="link">
                            Login
                        </NavLink>
                    </div>
                    <Router>
                        <Route path="/register">
                            {/*<Register onSignUp={setUser} />*/}
                        </Route>
                        <Route path="/loginform">
                            {/*element={<LoginForm onLogin={setUser} />}>*/}
                        </Route>
                    </Router>
                </div>
            )}
        </div>
    );
}

export default Header;
