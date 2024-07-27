import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <AuthProvider>
        <Router>
            <App />
        </Router>
    </AuthProvider>);
