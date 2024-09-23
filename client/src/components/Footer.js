import React from "react";
import { NavLink } from "react-router-dom";
function Footer() {

    return (
        <div>
            <ul className="footer">
                <li>
                    <NavLink to="about">
                            About Us
                    </NavLink>
                </li>

                <li>
                    <NavLink to="contact">
                            Contact

                    </NavLink>
                </li>
                
                <li>
                    <NavLink
                        to="follows" >
                    Friends
                    </NavLink>
                </li>
                {/*<NavLink
                    to="/home/moviesearch"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Find Movies
                </NavLink>*/}

                <li>
                <NavLink
                    to="movies"
                >
                    Browse Movies
                </NavLink>
                </li>
                {/*<li>
                <NavLink
                    to="recommendations"
                >
                    Recommendations
                    </NavLink>
                </li>*/}
                {/*<NavLink
                    to="/home/edituser"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Edit User
                </NavLink>*/}
            </ul>
        </div>
    );
}

export default Footer;