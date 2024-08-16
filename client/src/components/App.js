import React from "react";
import Home from "./Home";
import { useAuth } from "../contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import LoginFormContainer from "./LoginFormContainer";
import RegisterContainer from "./RegisterContainer";
import NotFound from "./NotFound";


function App() {
    const { isLoggedIn } = useAuth();
    return (
        <>
            <Header />
            {isLoggedIn ? (
                <>
                    <Routes>
                        <Route path="/home/*" element={<Home />} />
                        <Route path="/*" element={<NotFound /> } />
                    </Routes>
                </>
            ) : (
                <>
                        <Routes>
                            
                        <Route
                            path="/loginformcontainer"
                            element={<LoginFormContainer />}
                        />
                        <Route
                            path="/registercontainer"
                            element={<RegisterContainer />}
                        />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </>
            )}
        </>
    );
}

export default App;
