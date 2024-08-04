import React from 'react';
import { Routes, Route} from 'react-router-dom';
//import { useAuth } from '../contexts/AuthContext';
import About from './About';
import Carousel from './Carousel';
import Contact from './Contact';
import EditUser from './EditUser';
import FollowsList from './FollowsList';
import Follows from './Follows';
import SearchUsers from './SearchUsers';
import MakeRec from './MakeRec';
import Profile from './Profile';
import RecFeed from './RecFeed';
import RecList from './RecList';

function ContentContainer() {    
    return (
        <div className="contentcontainer">Container
            <Routes>
                <Route exact path="/about" element={<About />} />
                <Route exact path="/carousel" element={<Carousel />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/edituser" element={<EditUser />} />
                <Route exact path="/followslist" element={<FollowsList />} />
                <Route path="/searchusers" element={<SearchUsers />} />
                <Route exact path="/follows/*" element={<Follows />} />
                <Route exact path="/makerec" element={<MakeRec />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/recfeed" element={<RecFeed />} />
                <Route exact path="/reclist" element={<RecList />} />
            </Routes>
        </div>
    );
};
export default ContentContainer;
