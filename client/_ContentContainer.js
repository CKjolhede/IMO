import React from 'react';
import { Routes, Route, Outlet} from 'react-router-dom';
//import { useAuth } from '../contexts/AuthContext';
import About from './src/components/About';
import Carousel from './src/components/Carousel';
import Contact from './src/components/Contact';
import EditUser from './src/components/EditUser';
import FollowsList from './src/components/FollowsList';
import Follows from './src/components/Follows';
import SearchUsers from './src/components/SearchUsers';
import MakeRec from './src/components/MakeRec';
import Profile from './src/components/Profile';
import RecFeed from './src/components/RecFeed';
import RecList from './src/components/RecList';

function ContentContainer() {    
    return (
        <div className="contentcontainer">
            <Routes>
                <Route exact path="/about" element={<About />} />
                <Route exact path="/carousel" element={<Carousel />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/edituser" element={<EditUser />} />
                <Route exact path="/followslist" element={<FollowsList />} />
                <Route path="/searchusers" element={<SearchUsers />} />
                <Route exact path="/follows/" element={<Follows />} />
                <Route exact path="/makerec" element={<MakeRec />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/recfeed" element={<RecFeed />} />
                <Route exact path="/reclist" element={<RecList />} />
            </Routes>
            <Outlet />
        </div>
    );
};
export default ContentContainer;
