//import Layout from "./Layout";
import React from "react";
import {
    Routes, Route, useNavigation
} from "react-router-dom";
import MakeRec from "./MakeRec"; 
import RecList from "./RecList"; 
import Follows from "./Follows"; 
import EditUser from "./EditUser"; 
import Carousel from "./Carousel";
import About from "./About"; 
import Contact from "./Contact";
import ContentContainer from "./ContentContainer";
import { useAuth } from "../contexts/AuthContext";
import Home from "./Home";
import Header from "./Header";
import SideBar from "./SideBar";
import LoginFormContainer from "./LoginFormContainer";
import RegisterContainer from "./RegisterContainer";

function App() {
    const { isLoggedIn } = useAuth
    
    return (
        <div>
            <div className="header">
                <Header />
            </div>
            <div>
                {isLoggedIn ? (<>
                <div className="home"><Home /></div>
                    <div className="aside"><SideBar /></div>
                    <div className="container"><ContentContainer /></div><Routes>
                        <Route path="edituser" element={<EditUser />} />
                        <Route path="makerec" element={<MakeRec />} />
                        <Route path="reclist" element={<RecList />} />
                        <Route path="follows" element={<Follows />} />
                        <Route path="carousel" element={<Carousel />} />
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                    </Routes></>
                ) : ( <>
                    <div className="home" path="/home"><Home /></div>
                        <Routes>
                            <Route path="loginformcontainer" element={<LoginFormContainer />} />
                            <Route path="registercontainer" element={<RegisterContainer />} />
                        </Routes>
                    </>)
                }
            </div>
        </div>
    );
}

export default App;
