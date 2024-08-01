import {Routes, Route } from "react-router-dom";
import Layout from "./Layout"; 
import MakeRec from "./MakeRec"; 
import RecList from "./RecList"; 
import Follows from "./Follows"; 
import EditUser from "./EditUser"; 
import Carousel from "./Carousel";
import About from "./About"; 
import Contact from "./Contact";
//import ContentContainer from "../_ContentContainer";
//import { useAuth } from "../contexts/AuthContext";
import Home from "./Home";
import Header from "./Header";
import SideBar from "./SideBar";


function App() {
  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
          <Route path="layout" element={<Layout />} />
            <Route path="sidebar" element={<SideBar />}/> 
            {/*<Route path="contentcontainer" element={<ContentContainer />} />*/}
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="makerec" element={<MakeRec />} />
              <Route path="reclist" element={<RecList />} />
              <Route path="follows" element={<Follows />} />
              <Route path="carousel" element={<Carousel />} />
              <Route path="edituser" element={<EditUser />} />
      </Routes>
    </div>)
}
export default App;
