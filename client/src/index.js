import React from "react";
import App from "./components/App";
import "./index.css";
//import "./chris.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Router>
        <AuthProvider>
            <Routes><Route path="/app" element={<App />} /></Routes>
                <App />
        </AuthProvider>
    </Router>);