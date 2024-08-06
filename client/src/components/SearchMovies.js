import React, { useState } from "react";
import axios from "axios";

function SearchMovies() {
    const [searchTerm, setSearchTerm] = useState("");

    const onInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const onFormSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.get(
            `http://localhost:5555/movies/searchMovies?searchTerm=${searchTerm}`
        );
    console.log(response);
    };
    return (
        <form onSubmit={onFormSubmit}>
            <input type="text" value={searchTerm} onChange={onInputChange} />
            <button type="submit">Search Movies</button>
        </form>
    );
};

export default SearchMovies;
