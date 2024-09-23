import { useAuth } from "../contexts/AuthContext";
//import { useRec } from "../contexts/RecContext";
import React, { useEffect, useState } from "react";
import RecFeed from "./RecFeed";
import RecCard from "./RecCard";
import EditUser from "./EditUser";
import Recommendations from "./Recommendations";
import ProfileModal from "./ProfileModal";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
//import Modal from "./Modal";
import defaultProfilePic from "./images/imo_emu.png";

const UserProfile = ({updateUserImage}) => {
    const { user } = useAuth();
    const [friendRecommendations, setFriendRecommendations] = useState([]);

useEffect(() => {
    
    const fetchFriendRecommendations = async () => {
        try {
            const response = await fetch("/follows/" + user.id, {
                method: "GET",
            });
            if (response.ok) {
                const friends = await response.json();
                const friendRecommendations = await Promise.all(
                    friends.map(async (friend) => {
                        try {
                            const response = await fetch("/recommendations/" + friend.following_id, {
                                method: "GET",
                            });
                            return await response.json();
                        } catch (error) {
                            return console.error(
                                "Error fetching recommendations for friend:",
                                error
                            );
                        }
                    })
                );
                setFriendRecommendations(friendRecommendations);
            } else {
                console.error("Failed to fetch friends:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching friend recommendations:", error);
        }
    };
    fetchFriendRecommendations();
}, [user.id]);    

    return (
        <>
            <Routes>
                <Route
                    path="/edituser"
                    element={<EditUser updateUserImage={updateUserImage} />}
                />
                <Route path="/profilemodal" element={<ProfileModal />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/recfeed" element={<RecCard />} />
            </Routes>
            <div className="userprofile-container">
                <div className="userprofile-card">
                    <img
                        className="profilePic"
                        src={defaultProfilePic}
                        name="profilePic"
                        alt="ProfileImage"
                    />
                    <h1>
                        {user.first_name} {user.last_name}
                    </h1>
                    <h2>{user.email}</h2>
                    <h2>{user.phone}</h2>
                    <h2>{user.zipcode}</h2>
                    <div>
                        <Link to="/edituser">
                            <button className="editProfileLink">
                                Edit Profile
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="userprofile-friendRecs">
                    {friendRecommendations.length > 0 && (
                        <h1 className="moviecard-name">
                            Friend Recommendations
                        </h1>
                    )}
                    <RecFeed recommendations={friendRecommendations} />
                </div>
                <div className="userprofile-recfeed">
                    {friendRecommendations.length > 0 && (
                        <h1 className="moviecard-name">
                            Your Recommendations
                        </h1>
                    )}
                    <Recommendations />
                </div>
            </div>
        </>
    );
};

export default UserProfile;

//import { useAuth } from "../contexts/AuthContext";//+
//import React, { useState } from "react";//+
//import Modal from "./Modal";//+

    /*{isModalOpen && <Modal onSelectImage={handleImageSelect} />}*/
    //const base_url = "home/userprofile/modal";
    //const [isModalOpen, setIsModalOpen] = useState(false);

    //const handleImageClick = () => {
    //    setIsModalOpen(true);
    //};

    //const handleImageSelect = (newimage) => {
    //    updateUserImage(newimage);
    //    setIsModalOpen(false);
    //};

    //const imageUrl = base_url + "/images/" + Modal.image.index + ".png";

    //console.log("Image URL:", imageUrl); // Log the image URL
////function UserProfile({ updateUserImage }) {//-
////    const base_url = "imo/client/src/components/assets";//-
////    const { user } = useAuth();//-
////    const [isModalOpen, setIsModalOpen] = useState(false);//-
////    const handleImageClick = () => {//-
////        setIsModalOpen(true);//-
////    };//-
//function UserProfile({ updateUserImage }) {//+
//    const base_url = "home/userprofile/modal";//+
//    const { user } = useAuth();//+
//    const [isModalOpen, setIsModalOpen] = useState(false);//+

////    const handleImageSelect = (newimage) => {//-
////        updateUserImage(newimage);//-
////        setIsModalOpen(false);//-
//    const handleImageClick = () => {//+
//        setIsModalOpen(true);//+
//    };//+

////    };//-
//    const handleImageSelect = (newimage) => {//+
//        updateUserImage(newimage);//+
//        setIsModalOpen(false);//+
//    };//+

////    return (//-
////        <>//-
////            < div className="Profile">//-
////                <img className="profilePic"//-
////                src={ base_url + user.image }//-
////                name = "profilePic"//-
////                alt="ProfileImage"//-
////                onClick={handleImageClick}//-
////                style={{ cursor: 'pointer' }} />//-
////                {isModalOpen && <Modal onSelectImage={handleImageSelect} />}//-
////                <h1>{user.first_name} {user.last_name}</h1>//-
////                <h2>{user.email}</h2>//-
////                <h2>{user.phone}</h2>//-
////                <h2>{user.zipcode}</h2>//-
////            </div>//-
////            </>//-
////    );//-
////    };//-
//    const imageUrl = base_url + "/images/" + Modal.image.index + ".png";//+
//    console.log("Image URL:", imageUrl); // Log the image URL//+

////export default UserProfile;//-
//    return (//+
//        <>//+
//            <div className="Profile">//+
//                <img//+
//                    className="profilePic"//+
//                    src={imageUrl}//+
//                    name="profilePic"//+
//                    alt="ProfileImage"//+
//                    onClick={handleImageClick}//+
//                    style={{ cursor: "pointer" }}//+
//                />//+
//                {isModalOpen && <Modal onSelectImage={handleImageSelect} />}//+
//                <h1>//+
//                    {user.first_name} {user.last_name}//+
//                </h1>//+
//                <h2>{user.email}</h2>//+
//                <h2>{user.phone}</h2>//+
//                <h2>{user.zipcode}</h2>//+
//            </div>//+
//        </>//+
//    );//+
//}//+
////+
//+
