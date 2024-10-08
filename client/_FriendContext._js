// src/contexts/RecContext.js
import React, { useContext, useState, createContext, useEffect, } from "react";
import { useAuth } from '../contexts/AuthContext';
import { useRec } from "../contexts/RecContext";
const FriendContext = createContext();

export const useFriend= () => useContext(FriendContext);

export const FriendProvider = ({ children }) => {
    const { user } = useAuth();
    const { recommendations } = useRec();
    const [friends, setFriends] = useState([]);
    useEffect(() => {
            const fetchFriends = async () => {
                try {
                    const response = await fetch('/follows/' + user.id, { method: 'GET' });
                    if (response.ok) {
                        const data = await response.json();
                        setFriends(data);
                    } else {
                        console.error('Failed to fetch friends:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching friends:', error);
                }
            };
            fetchFriends();
    }, [user]);
    

    const removeFriend = async (friends_Id) => {
        const response = await fetch("/friends/" + friends_Id, {
            method: "DELETE",
        });
        response.ok
            ? onRemove(friends_Id)
            : console.error("Failed to remove friend");
    };

    const onRemove = (id) => {
        setFriends(friends?.filter((friend) => friend.id !== id));
    };

    const acceptFriend = async (friends_id) => {
        try {
            const response = await fetch("/friends/" + friends_id, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "accepted" }),
            });
            const updatedFriend = await response.json();
            response.ok
                ? setFriends(
                    friends?.map(
                        (friend) => friend.following_id !== updatedFriend.id
                    )
                )
                : console.error("Failed to accept friend");
            setFriends([updatedFriend, ...friends]);
        } catch (error) {
            console.error("Failed to accept friend");
        }
    };

    const sendFriendRequest = async (friendUserId, user_id) => {
        try {
            const response = await fetch("/friends/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    following_id: friendUserId,
                    follower_id: user_id,
                    status: "pending",
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFriends([data, ...friends]);
            //setName(name);
        } catch (error) {
            console.error("Failed to send friend request", error);
        }
    };


    return (
        <FriendContext.Provider value={{ friends, removeFriend, acceptFriend, sendFriendRequest, setFriends}}>
            {children}
        </FriendContext.Provider>
        )
}
