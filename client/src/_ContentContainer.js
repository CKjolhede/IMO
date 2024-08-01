import React from 'react';
import { Routes, Route} from 'react-router-dom';
//import { useAuth } from '../contexts/AuthContext';
import About from './components/About';
import Carousel from './components/Carousel';
import Contact from './components/Contact';
import EditUser from './components/EditUser';
import FollowsList from './components/FollowsList';
import MakeRec from './components/MakeRec';
import Profile from './components/Profile';
import RecFeed from './components/RecFeed';
import RecList from './components/RecList';

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
