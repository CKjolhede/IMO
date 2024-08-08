import React, { useState, useEffect } from 'react';
import SearchUsers from './SearchUsers';
import { useAuth } from '../contexts/AuthContext';
import FollowsList from './FollowsList';


function Follows() {
    const { user } = useAuth();
    const [follows, setFollows] = useState([]);

    useEffect(() => {
        const userId = user.id;
        fetch('/follows/' + userId, { method: 'GET' })
            .then(res => res.json())
            .then(data => setFollows(data));
    }, [user.id]);
    
    const pendingFollows = []
    const acceptedFollows = []
    const requestedFollows = []
    
    for (let i = 0; i < follows.length; i++) {
        const friend = follows[i];
        if (friend.status === "requested" && friend.following_id === user.id) {
            requestedFollows.push(friend);}
        else if (friend.status === "requested" && friend.following_id !== user.id) {
            pendingFollows.push(friend);
        } else if (friend.status === "accepted") {
            acceptedFollows.push(friend);
        }
    }
    return (
        <>
            <div>
                Search for Friends
                <SearchUsers />
            </div>
            <h1>Friends</h1>
            <div>
                <FollowsList props = {[requestedFollows, pendingFollows,acceptedFollows]}  />
            </div>
        </>
    );
}

export default Follows;