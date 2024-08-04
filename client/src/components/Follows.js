import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
        console.log(user.id, follows);
    }, [user.id, follows]);
    return (
        <>
                <div>
            <Routes>
                    <Route path="/searchusers" element={<SearchUsers />} />
            </Routes>
                    <SearchUsers />;
                </div>
                <h1>Following</h1>
                <div>
            <Routes>
                    <Route path='/followlist' element={<FollowsList follows={follows} />}/>
            </Routes>
                </div>
        </>
    );
}

export default Follows;