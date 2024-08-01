import React from 'react';
import FollowCard from './FollowCard';

import { useNavigate } from 'react-router-dom';

function FollowsList({ follows }){
    
    return (
        <>
        <h2>Current Followers</h2>
        <div><ul className="FollowsList">
                <li className="FollowsCard">
                    {follows.map((follow) =>
                        (<FollowCard key={follow.id} follow={follow} />)
                    )}</li>
            </ul>
        </div>
        </>
    );
}   

export default FollowsList;