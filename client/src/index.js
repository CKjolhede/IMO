import React from "react";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import "./css/index.css";
import "./css/login.css";
import "./css/movie.css";
import "./css/footer.css";
import "./css/header.css";
import "./css/register.css"
import "./css/userProfile.css";
import "./css/header.css";
import "./css/follow.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
//import { FriendProvider } from "./contexts/FriendContext";
import { RecProvider } from "./contexts/RecContext";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Router>
        <AuthProvider>
            {/*<FriendProvider>*/}
                <RecProvider>
                    <Routes>
                        <Route path="/*" element={<Home />} />
                    </Routes>                    
                    {/*<Home />*/}
            </RecProvider>
            {/*</FriendProvider>*/}
        </AuthProvider>
    </Router>
);
