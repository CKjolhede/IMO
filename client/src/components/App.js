import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import About from "./About";
//import Carousel from "./Carousel";
//import Contact from "./Contact";
//import EditUser from "./EditUser";
//import Friends from "./Friends";
import Header from "./Header";
//import LoginForm from "./LoginForm";
import Main from "./Main";
//import Profile from "./Profile";
import Sidebar from "./SideBar"; 
//import RecFeed from "./RecFeed";
//import RecList from "./RecList";
//import Register from "./Register";
//import MakeRec from "./MakeRec";



function App() {


  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Main />
      <Router>
        <Route exact path="/" element={<App />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/carousel" element={<Carousel />} />
        <Route exact path="/contact" element={<Contact />}/>
        <Route exact path="/edituser" element={<EditUser />} />
        <Route exact path="/friends" element={<Friends />} />
        <Route exact path="/loginform"element={<LoginForm />} />
        <Route exact path="/makerec" element={<MakeRec />} />
        <Route exact path="/recfeed" element={<RecFeed />} />
        <Route exact path="/reclist" element={<RecList />} />
        <Route exact path="/register" element={<Register />} />

        
        
  
      </Router>
    </div>)
}


export default App;
