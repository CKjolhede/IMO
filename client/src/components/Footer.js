import React from "react";
import { NavLink } from "react-router-dom";
import audience from "./images/audience.png"
function Footer() {

    return (
        <div className="footer">
            <ul className="footer">
                <li className="footer-about">
                    <NavLink to="about">About</NavLink>
                </li>

                <li className="footer-contact">
                    <NavLink to="contact">Contact</NavLink>
                </li>

                <li className="footer-follows">
                    <NavLink to="follows">Friends</NavLink>
                </li>
                {/*<NavLink
                    to="/home/moviesearch"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Find Movies
                </NavLink>*/}

                <li className="footer-movies">
                    <NavLink to="movies">Browse Movies</NavLink>
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
            <img className="audience" src={audience} alt="audience" />
        </div>
    );
}

export default Footer;