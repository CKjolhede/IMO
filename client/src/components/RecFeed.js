import React, { useState } from 'react';
import { BrowserRouter as Router, Route, useHistory, NavLink, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


function RecFeed() {
    const { auth, logout, currentUser } = useAuth();

    return (
        <div>
            <h1>RecFeed</h1>
        </div>
    );
}

export default RecFeed;
