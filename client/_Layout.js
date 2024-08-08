import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./src/components/SideBar"; 

function Layout() {
    return (
        <div className="layout">
            <SideBar />
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
