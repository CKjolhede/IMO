import React from "react";
import { NavLink, Link, useMatch, useResolvedPath } from "react-router-dom";



function SideBar() {
    
    return (
        <aside className="aside">
            <ul>
                {/*<NavLink to="/home/recfeed">RecFeed</NavLink>
                <NavLink to="/home/about">About</NavLink>
                <NavLink to="/home/contact">Contact</NavLink>
                <NavLink to="/home/follows">Follows</NavLink>
                <NavLink to="/home/makerec">Make Rec</NavLink>
                <NavLink to="/home/reclist">Rec List</NavLink>
                <NavLink to="/home/profile">Profile</NavLink>
                <NavLink to="/home/carousel">Carousel</NavLink>
                <NavLink to="/home/edituser">Edit User</NavLink>*/}
                <CustomLink to="/home/recfeed">RecFeed</CustomLink>
                <CustomLink to="/home/about">About</CustomLink>
                <CustomLink to="/home/contact">Contact</CustomLink>
                <CustomLink to="/home/follows">Follows</CustomLink>
                <CustomLink to="/home/makerec">Make Rec</CustomLink>
                <CustomLink to="/home/reclist">Rec List</CustomLink>
                <CustomLink to="/home/profile">Profile</CustomLink>
                <CustomLink to="/home/carousel">Carousel</CustomLink>
                <CustomLink to="/home/edituser">Edit User</CustomLink>
            </ul>
        </aside>
    );
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