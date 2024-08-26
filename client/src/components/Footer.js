import React from "react";
import { NavLink } from "react-router-dom";
function Footer() {

    return (
        <div>
            <ul className="footer">
                <li>
                    <NavLink to="/home/about">
                            About Us
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/home/contact">
                            Contact

                    </NavLink>
                </li>
                
                <li>
                    <NavLink
                        to="/home/follows" >
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
                    to="/home/movies"
                >
                    Browse Movies
                </NavLink>
                </li>
                <li>
                <NavLink
                    to="/home/recommendations"
                >
                    Recommendations
                    </NavLink>
                </li>
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