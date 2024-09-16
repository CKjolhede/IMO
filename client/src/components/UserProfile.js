import { useAuth } from "../contexts/AuthContext";
import React, { useState } from "react";
//import Modal from "./Modal";
import defaultProfilePic from "./images/userDefault.png";

const UserProfile = () => {
    const { user } = useAuth();


    return (
        <>
            <div className="userprofile-container">
                <div className="userprofile">
                    <img className="card-user-image"
                    src={defaultProfilePic}
                    name="profilePic"
                    alt="ProfileImage"                />
                    <h1>{user.first_name} {user.last_name}</h1>
                    <h2>{user.email}</h2>
                    <h2>{user.phone}</h2>
                    <h2>{user.zipcode}</h2>
                </div>
            </div>
        </>
    );
};



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
export default UserProfile;//+
