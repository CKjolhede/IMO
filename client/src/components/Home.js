import React from 'react';
import { Routes, Route} from 'react-router-dom';
import ContentContainer from './ContentContainer';
import SideBar from './SideBar';
import LoginFormContainer from './LoginFormContainer';
import RegisterContainer from './RegisterContainer';
import { useAuth } from '../contexts/AuthContext';
import MakeRec from "./MakeRec";
import RecList from "./RecList";
import Follows from "./Follows";
import EditUser from "./EditUser";
import Carousel from "./Carousel";
import About from "./About";
import Contact from "./Contact";

function Home() {
    const { isLoggedIn } = useAuth();
    
    return (
        <>
            {isLoggedIn ? (
                <>
                    <div className="aside">
                        <SideBar />
                    </div>
                    <div className="container">
                        <ContentContainer />
                    </div>
                    <Routes>
                        <Route path="/sidebar" element={<SideBar />} />
                        <Route path="/contentcontainer" element={<ContentContainer />}>
                            <Route path="edituser" element={<EditUser />} />
                            <Route path="makerec" element={<MakeRec />} />
                            <Route path="reclist" element={<RecList />} />
                            <Route path="follows" element={<Follows />} />
                            <Route path="carousel" element={<Carousel />} />
                            <Route path="about" element={<About />} />
                            <Route path="contact" element={<Contact />} />
                        </Route>
                    </Routes>
                </>
            ) : (
                <>
                    <div className="home">
                        <Routes>
                            <Route
                                path="loginformcontainer"
                                element={<LoginFormContainer />}
                            />
                            <Route
                                path="registercontainer"
                                element={<RegisterContainer />}
                            />
                        </Routes>
                    </div>
                </>
            )}
        </>
        //<div className="home">
        //    {isLoggedIn ? (
        //        <div>
        //            <aside className="aside">
        //                <SideBar />
        //            </aside>
        //            <main className="content-container-layout">
        //                ContentContainer
        //                <Routes>
        //                    <Route
        //                        exact
        //                        path="/contentcontainer"
        //                        element={<ContentContainer />}
        //                    />
        //                </Routes>
        //            </main>
        //        </div>
        //    ) : (
        //        <div className="login-con">
        //            <LoginFormContainer />
        //        </div>
        //    )}
        //</div>
    );
}
export default Home;
        
        
        

        //<div>
        //        {isLoggedIn ? (<>
        //            <div className="aside"><SideBar /></div>
        //            <div className="container"><ContentContainer /></div>
        //                <Routes>
        //                        <Route path="edituser" element={<EditUser />} />
        //                        <Route path="makerec" element={<MakeRec />} />
        //                        <Route path="reclist" element={<RecList />} />
        //                        <Route path="follows" element={<Follows />} />
        //                        <Route path="carousel" element={<Carousel />} />
        //                        <Route path="about" element={<About />} />
        //                        <Route path="contact" element={<Contact />} />
        //                    </Routes></>
        //        ) : ( <>
        //            <div className="home" path="/home"><Home /></div>
        //                <Routes>
        //                    <Route path="loginformcontainer" element={<LoginFormContainer />} />
        //                    <Route path="registercontainer" element={<RegisterContainer />} />
        //                </Routes>
        //            </>)
        //        }
        //    </div>