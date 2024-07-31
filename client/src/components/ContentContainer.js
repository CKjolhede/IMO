import React from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
//import { useAuth } from '../contexts/AuthContext';
import About from './About';
import Carousel from './Carousel';
import Contact from './Contact';
import EditUser from './EditUser';
import FollowsList from './FollowsList';
import MakeRec from './MakeRec';
import Profile from './Profile';
import RecFeed from './RecFeed';
import RecList from './RecList';

function ContentContainer() {    
   
    return (
        <div className="ContentContainer">Container
            <Routes>
                <Route exact path="/about" element={<About />} />
                <Route exact path="/carousel" element={<Carousel />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/edituser" element={<EditUser />} />
                <Route exact path="/followslist" element={<FollowsList />} />
                <Route exact path="/makerec" element={<MakeRec />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/recfeed" element={<RecFeed />} />
                <Route exact path="/reclist" element={<RecList />} />
            </Routes>
            <h1>ContentContainer</h1>
        </div>
    );
};
export default ContentContainer;
