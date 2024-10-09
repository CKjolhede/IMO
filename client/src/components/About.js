import React from "react";
import { useAuth } from "../contexts/AuthContext";
import defaultProfilePic from "./images/imo_emu.png";




function About() {
const { user } = useAuth();
    return (
        <div>
            <h1 className="page-title"> About IMO</h1>
            <h1 className="page-title-userprofile">
                <img src={defaultProfilePic} alt="ProfileImage" />{" "}
                {user.first_name}
            </h1>
        </div>
    );
}

export default About;