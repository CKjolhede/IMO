import React, { useState, useEffect } from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import SearchUsers from './SearchUsers';
import { useAuth } from '../contexts/AuthContext';
import FollowsList from './FollowsList';


function Follows() {
    const { user } = useAuth();
    const [follows, setFollows] = useState([]);
    
    useEffect(() => {
        const userId = user.id;
        fetch('/followsbyid/' + userId, {method: 'GET' })
            .then(res => res.json())
            .then(data => setFollows(data))
    }, [user.id]);
    
    return (
        <>
            <Routes>
                <div>
                    <Route path="/searchusers" element={<SearchUsers />} />
                </div>
                <h1>Following</h1>
                <div>
                    <Route path='/followlist' element={<FollowsList follows={follows} />}/>
                </div>
            </Routes>
        </>
    );
}

export default Follows;