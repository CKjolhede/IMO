import React, { useState } from "react";
import axios from "axios";
//import { useSearchParams } from "react-router-dom";

const SearchUsers = () => {
    const [term, setTerm] = useState("");
    //const [searchParams, setSearchParams] = useSearchParams();

    const onInputChange = (event) => {
        setTerm(event.target.value);
    };

    const onFormSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.get(
            `http://localhost:5555/users/search?term=${term}`
        );

        console.log(response.data);
    };

    return (
        <form onSubmit={onFormSubmit}>
            <input type="text" value={term} onChange={onInputChange} />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchUsers;
