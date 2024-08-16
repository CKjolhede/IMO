import React from 'react';
import { Routes, Route} from 'react-router-dom';
import SideBar from './SideBar';
import Follows from "./Follows";
import EditUser from "./EditUser";
import Movies from "./Movies";
import About from "./About";
import UserProfile from "./UserProfile";
import Contact from "./Contact";
import Recommendations from "./Recommendations";
import MovieSearch from "./MovieSearch";


function Home() {


    return (
        <div className="home">
            <div className="home-sidebar">
                <SideBar />
            </div>
            <div className="home-content">
                <Routes>
                    <Route path="follows" element={<Follows />} />
                    <Route path="edituser" element={<EditUser />} />
                    <Route path="moviesearch" element={<MovieSearch/>} />
                    <Route path="movies" element={<Movies />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="userprofile" element={<UserProfile />} />
                    <Route path="recommendations" element={<Recommendations />} />
                </Routes>
            </div>
        </div>
    );
}
export default Home;