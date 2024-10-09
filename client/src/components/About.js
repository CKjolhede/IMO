import React from "react";
import { useAuth } from "../contexts/AuthContext";
import defaultProfilePic from "./images/imo_emu.png";




function About() {
const { user } = useAuth();
    return (
        <div>
            <h1 className="page-title"> About IMO</h1>
            <h1 className="page-title-userprofile">
                {user.first_name}
                <img src={defaultProfilePic} alt="ProfileImage" />
            </h1>
            <div className="about-page-container">
                <p>
                    <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>IMO</span>is a platform
                    designed to provide users an easy way to share their
                    favorite movies with their friends and family. Users can also
                    see what movies are popular among their friends, and the
                    most popular movies being watched worldwide.
                </p>

                <p>
                    Although the most popular streaming services offer
                    recommendations based on the movies you watch, IMO offers a
                    more personal experience. Who knows you better than your
                    friends and family? Typically, friends will share common interests
                    and have similiar preferences. So who better than to be able to suggest
                    a movie that you will enjoy?
                </p>

                <p>
                    This site was designed as a capstone project for the
                    Flatiron School's Software Engineering Immersive. The
                    project was created as a showcase 
                    to demonstrate to potential employers my skillset, my knowledge and my potential.
                </p>

                <p>
                    The full code can be seen on{" "}
                    <a href="https://github.com/ckjolhede/imo"> GitHub</a>
                </p>
            </div>
        </div>
    );
}

export default About;