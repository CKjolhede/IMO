
import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import LoginFormContainer from "./LoginFormContainer";
import RegisterContainer from "./RegisterContainer";
import { useAuth } from "../contexts/AuthContext";
import NotFound from "./NotFound";


function App() {
    const { isLoggedIn } = useAuth();
    return (
        <>
            <Header />
            {isLoggedIn ? (
                <>
                    <Routes>
                        <Route path="/home/*" element={<Home />}/>       
                        <Route path="/*" element={<NotFound />} />
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
                        <Route path="/*" component={NotFound} />
                    </Routes>
                </>
            )}
        </>
    );
}


export default App;

