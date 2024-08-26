import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";



const ProfilePicture = () => {
    const { user } = useAuth();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(
        ("profile picture")
    );

    const avatars = [
        ("/images/1.png"),
        ("/images/2.png"),
        ("/images/3.png"),
        ("/images/4.png"),
        ("/images/5.png"),
        ("/images/6.png"),
        ("/images/7.png"),
        ("/images/8.png"),
        ("/images/9.png"),
        ("/images/10.png"),
        ("/images/11.png"),
        ("/images/12.png"),
        ("/images/13.png"),
        ("/images/14.png"),
        ("/images/15.png"),
        ("/images/16.png"),
        ("/images/17.png"),
        ("/images/18.png"),
        ("/images/19.png"),
        ("/images/20.png"),
        ("/images/21.png"),
        ("/images/22.png"),
    ];
    useEffect(() => {
        axios.get(`/users/${user.id}`)
            .then((response) => {
                setSelectedAvatar(response.data.image);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [user.id]);
    
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar);
        closeModal();
    
        axios.patch('/update-profile-picture', { user_id: user.id, image: avatar })
            .then(response => {
                console.log(response.data.message);
            })
            .catch(err => {
                console.error('Error while updating profile picture:', err);
            });
    };

    return (
        <div>
            <img
                src={selectedAvatar}
                alt="Profile"
                onClick={openModal}
                style={{ cursor: "pointer", width: "100px", height: "100px" }}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Select Avatar"
            >
                <h2>Select an Avatar</h2>
                <div style={{ display: "flex", gap: "10px" }}>
                    {avatars.map((avatar, index) => (
                        <img
                            key={index}
                            src={avatar}
                            alt="Avatar"
                            onClick={() => handleAvatarClick(avatar)}
                            style={{
                                cursor: "pointer",
                                width: "50px",
                                height: "50px",
                            }}
                        />
                    ))}
                </div>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
};

export default ProfilePicture;
