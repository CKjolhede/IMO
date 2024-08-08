import React from 'react';
import FollowCard from './FollowCard';

function FollowsList({ friends, pendingFriends, requestedFriends }){

    return (
        <>
            <div className="FriendList">
                    {friends.map((friend) =>
                        (<FollowCard key={friend.id} friendprop={friend} />)
                )}
                <h2 className="Status-subtitle">Friend requests sent</h2>
                {pendingFriends.map((friend) =>
                    (<FollowCard key={friend.id} friendprop={friend} />)
                )}
                    <h2 className="Status-subtitle">Want to be your friend</h2>
                    {requestedFriends.map((friend) =>
                        (<FollowCard key={friend.id} friendprop={friend} />))}
                    
            </div>
            
        </>
    );
}   

export default FollowsList;