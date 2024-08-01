import React, { useState,useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import RecCard from '../contexts/RecCard';


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

export default RecFeed;
