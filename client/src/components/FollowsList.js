import React from 'react';
import FollowCard from './FollowCard';

function FollowsList({ followsData }){

    return (
        <>
            <div className="FollowsList">
                <h2>FollowsList</h2>
                    {followsData.map((follow) =>
                        (<FollowCard key={follow.id} follow={follow.to_dict()} />)
                    )}
            </div>
            
        </>
    );
}   

export default FollowsList;