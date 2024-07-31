import React, {useState} from 'react';
import { Routes, Route} from 'react-router-dom';
import ContentContainer from './ContentContainer';
import Sidebar from './SideBar';
import LoginFormContainer from './LoginFormContainer';
import RegisterContainer from './RegisterContainer';
import { useAuth } from '../contexts/AuthContext';

function Home() {
    
    const { isLoggedIn } = useAuth();
    const [registered, setRegistered] = useState(true);
    
    const regi = () => {
        setRegistered(!registered);
    };
    
    
    return (
        <div className="home-container-loggedin">
            {isLoggedIn ? (
                <>
                    <div className="sidebar">
                        Sidebar
                        <Routes>
                            <Route
                                exact
                                path="/sidebar"
                                element={<Sidebar />}
                            />
                        </Routes>
                    </div>
                    <div className="contentcontainer">
                        ContentContainer
                        <Routes>
                            <Route
                                exact
                                path="/contentcontainer"
                                element={<ContentContainer />}
                            />
                        </Routes>
                    </div>
                </>
            ) : (registered ? (
                <>
                        <LoginFormContainer setReg={regi} />
                    <Routes>
                    <Route exact path="/loginformcontainer"
                        element={<LoginFormContainer setReg={regi}/>}
                    />
                        </Routes>
                </>
            ) : (
                <RegisterContainer setReg={regi}/>
                //<Routes>
                //    <Route path="/registercontainer" element = {<RegisterContainer />} />
                //</Routes>
            ))}
        </div>
    );              
}                    

export default Home;
