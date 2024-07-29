import React from 'react';
import {BrowseRouter as Router, Route, useHistory, NavLink, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import About from './About';
import Carousel from './Carousel';
import Contact from './Contact';
import EditUser from './EditUser';
import Friends from './Friends';
import LoginForm from './LoginForm';
import MakeRec from './MakeRec';
import Profile from './Profile';
import RecFeed from './RecFeed';
import RecList from './RecList';
import Register from './Register';

function Main() {
    const { auth, logout, currentUser } = useAuth();
   
    
    
    return (
        <div className="Main">
            {/*<RecFeed />
            <RecList />
            <Carousel />
            <About />
            <Contact />
            <LoginForm />
            <MakeRec />            <Register />
            <EditUser />
            <Profile />
            <Friends />*/}
            <h1>Main</h1>
        </div>
    );
};



export default Main;
