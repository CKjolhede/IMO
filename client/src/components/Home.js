import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Main';
import Sidebar from './SideBar';
import LoginForm from './LoginForm';
import Register from './Register';
import { useAuth } from '../contexts/AuthContext';

function Home() {
    
    const{ auth, isloggedIn, currentUser } = useAuth();
    return (
            <div>
                {isloggedIn ? (
                    <div >
                        <Sidebar className="sidebar"/><h2>SideBar</h2>
                        <Main className="main" /><h2>Main</h2>
                    </div>
            ) : ( 
                    <>
                        <div className="sidebar">
                            <Sidebar /><h2>SideBar</h2>
                        </div>
                        <div className="main">
                            <Main /><h2>Main</h2>
                        </div>
                        
                        <div className="home-login-register">
                            <Router>
                                <Route exact path="/loginform">
                                    <LoginForm /></Route>
                                <Route exact path="/register">
                                    <Register /></Route>
                            </Router>
                        </div>
                    </>)
            }
            </div>
        )                
}
export default Home;