import React, { useState, useEffect } from 'react';
import SearchUsers from './SearchUsers';
import { useAuth } from '../contexts/AuthContext';
import FollowsList from './FollowsList';


function Follows() {
    const { user } = useAuth();
    const [follows, setFollows] = useState([]);
    
    useEffect(() => {
        const userId = user.id;
        fetch('/follows/' + userId, {method: 'GET' })
            .then(res => res.json())
            .then(data => setFollows(data))
        console.log(user.id, follows);
    }, [user.id, follows]);
    
    return (
        <>
            <div>
                Search for Friends
                <SearchUsers />
            </div>
            <h1>Friends</h1>
            <div>
                <FollowsList followsData={follows} />
            </div>
        </>
    );
}

export default Follows;