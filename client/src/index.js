import React from "react";
import App from "./components/App";
import "./index.css";
import "./login.css";
import "./Header.css";
//import "./CSS/Header.css";
//import "./chris.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RecProvider } from "./contexts/RecContext";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Router>
        <AuthProvider>
            <RecProvider>
            {/*<Routes><Route path="/app" element={<App />} /></Routes>*/}
                <App />
            </RecProvider>
        </AuthProvider>
    </Router>
);
