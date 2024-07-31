import React from "react";
import { Routes, Route } from "react-router-dom";
//import { useAuth } from "../contexts/AuthContext";
import Home from "./Home";
import Header from "./Header";

function App() {
  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>)
}
export default App;
