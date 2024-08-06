import React, {useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';

export default function NotFound (){
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => { navigate("/home"); }, 2000);
    return () => {clearTimeout(timer);}
    }, [navigate]);
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <button><Link to="/home">Return Home</Link></button>
        </div>
    );
};

