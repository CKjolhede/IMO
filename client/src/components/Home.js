import React from 'react';
import { Routes, Route} from 'react-router-dom';
import ContentContainer from './ContentContainer';
import Sidebar from './SideBar';
import LoginFormContainer from './LoginFormContainer';
import RegisterContainer from './RegisterContainer';
import { useAuth } from '../contexts/AuthContext';

function Home() {
    
    const { isLoggedIn } = useAuth();
    
    return (
        <div className="home">
            {isLoggedIn ? (
                <div>
                    <aside className="aside">
                        <Sidebar />
                    </aside>
                    <main className="content-container-layout">
                        ContentContainer
                        <Routes>
                            <Route
                                exact
                                path="/contentcontainer"
                                element={<ContentContainer />}
                            />
                        </Routes>
                    </main>
                </div>
            ) : (
                <div className="login-con">
                    <LoginFormContainer />
                </div>
            )}
        </div>);
}
export default Home;
