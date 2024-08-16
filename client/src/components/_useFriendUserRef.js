import { useRef } from "react";

export const useFriendUserRef = () => {
    const friendUserRef = useRef(null);

    const setFriendUser = (friendUser) => {
        friendUserRef.current = friendUser;
    };

    const getFriendUser = () => {
        return friendUserRef.current;
    };

    return { setFriendUser, getFriendUser };
};
