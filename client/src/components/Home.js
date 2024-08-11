import React from 'react';
import { Routes, Route} from 'react-router-dom';
import SideBar from './SideBar';
import MakeRec from "./MakeRec";
import RecList from "./RecList";
import Follows from "./Follows";
import EditUser from "./EditUser";
import Profile from "./Profile";
import Carousel from "./Carousel";
import About from "./About";
import Contact from "./Contact";

function Home() {
    
    return (
            <div className="home">
                <div className="home-sidebar">
                    <SideBar />
                </div>
                <div className="home-content">
                    <Routes>
                        <Route path="follows" element={<Follows />} />
                        <Route path="edituser"element={<EditUser />} />
                        <Route path="makerec" element={<MakeRec />} />
                        <Route path="carousel" element={<Carousel />} />
                        <Route path="reclist" element={<RecList />} />
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="profile" element={<Profile />} />
                    </Routes>
                
                </div>
            </div>                        
                
    );
}
export default Home;