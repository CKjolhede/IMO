
import React from "react";
import { Routes, Route
} from "react-router-dom";
import Home from "./Home";
import Header from "./Header";


function App() {
    
    return (<>
        <Routes>
            <Route path="/" component={<App />} >
                <Route path="/header" component={<Header />} />
                <Route path="/home" component={<Home />} /> 
            </Route>   
        </Routes>
    
        <div>
            <div className="header">
                <Header />
            </div>
            <div>
                <div className="home"><Home /></div>
            </div>
        </div>
    </>);
}

export default App;

                /*{isLoggedIn ? (<>
                    <Routes>
                        <Route className="aside"><SideBar /></Route>
                    </Routes>
                    <Routes>
                        <Route className="contentcontainer"><ContentContainer />
                            <Route path="edituser" element={<EditUser />} />
                            <Route path="makerec" element={<MakeRec />} />
                            <Route path="reclist" element={<RecList />} />
                            <Route path="follows" element={<Follows />} />
                            <Route path="carousel" element={<Carousel />} />
                            <Route path="about" element={<About />} />
                            <Route path="contact" element={<Contact />} /></Route>
                    </Routes></>
                ) : ( <>
                    <Routes>
                        <Route path="loginformcontainer" element={<LoginFormContainer />} />
                        <Route path="registercontainer" element={<RegisterContainer />} />
                    </Routes>*/
                    /*</>)
                }*/