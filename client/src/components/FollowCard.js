import React from 'react';
import { NavLink } from 'react-router-dom';

function FollowCard({ friendprop }) {
    //const [friend, setFriend] = useState({});
    //useEffect(() => {
    //    const friendById = async () => {
    //        const response = await fetch("/users/" + friendprop.following_id);
    //        if (response.ok) {
    //            const friend = await response.json();
    //            setFriend(friend);
    //        }
    //    };
    //    friendById();
    //}, [friendprop.following_id]);
    console.log(friendprop);

    return (
        <NavLink to={`/profile/${friendprop.id}`} className="follow-card-link">
            <div className='follow-card' >
                <div className="follow-card-header">
                    <div className="follow-card-header-left">
                        <img
                            className="follow-card-header-img"
                            src={friendprop.image}
                            alt="profile pic"></img> 
                        {friendprop.first_name} {friendprop.last_name}
                    </div>
                    {/*<div className="follow-card-header-right">
                        <button className="follow-card-header-btn">Follow</button>
                    </div>*/}
                </div>
            </div>
        </NavLink>
    );
}    
export default FollowCard;