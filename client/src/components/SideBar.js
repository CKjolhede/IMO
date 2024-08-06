import React from "react";
import {  Link, useMatch, useResolvedPath } from "react-router-dom";

function SideBar() {
    
    return (
        <aside className="aside">

            <ul>
                <Link to="follows">Folllows</Link>
                <CustomLink to="/recfeed">RecFeed</CustomLink>
                <CustomLink to="/about">About</CustomLink>
                <CustomLink to="/contact">Contact</CustomLink>
                <CustomLink to="/follows">Follows</CustomLink>
                <CustomLink to="/makerec">Make Rec</CustomLink>
                <CustomLink to="/reclist">Rec List</CustomLink>
                <CustomLink to="/profile">Profile</CustomLink>
                <CustomLink to="/carousel">Carousel</CustomLink>
                <CustomLink to="/edituser">Edit User</CustomLink>
            </ul>
        </aside>
    )
}  
                    
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true }); 
    return (    
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>)
}

export default SideBar;