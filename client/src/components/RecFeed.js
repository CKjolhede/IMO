import React, { useState,useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import RecCard from './RecCard';



function RecFeed() {
    const { user } = useAuth();
    const [recFeed, setRecFeed] = useState([]);
    
    useEffect(() => {
        const response = (fetch('/recommendations/' + user.id, { method: 'GET' }));
        if (response.ok) {
            const data = response.json();
            setRecFeed(data);
        }
    }, [user.id]);
    
    return (
        <div>
            <ul>
                {recFeed.map((rec) => <li>(<RecCard
                    key={rec.id}
                    rec={rec}
                />)</li>)}</ul>   
        </div>
    );
}  
    //const [recFeed, setRecFeed] = useState ([]);
    //const recFeedHistory = ({ user_input }) => {
    //        let "user_id" = useAuth.user.id;
    //        let "delta" = ((datetime.now() - timedelta({ user_input })));
        
    //    useEffect(() => {
    //        res: fetch("/recommendations/:userid:delta", { method: 'GET' })
    //            .then(res => res.json().to_dict())
    //            .then(data => setRecFeed(data))
    //    }, [{ user_input }])
    //    )

    //};
export default RecFeed;
