import React from "react";
import RecCard from './RecCard';

function RecList() {
    async function fetchMovies() {
        try {
            const response = await fetch("/api/movies");
            const data = await response.json();

    
        const movieList = document.getElementById("movie-list");
        movieList.innerHTML = "";
        data.forEach((movie) => {
            const movieElement = document.createElement("div");
            movieElement.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="https://image.tmdb.org/t/p/w500/${movie.posterPath}" alt="${movie.title}"/>
        <p>${movie.overview}</p>
        <p>${movie.releaseDate}</p>
        <p>${movie.voteAverage}</p>
        `;
            movieList.appendChild(movieElement);
        });
    } catch (error) {
        console.error(error);
        // Handle the error
    }
}

fetchMovies();
    
    
    return (
        <div className="Reclist">
            <h1>Recommendations</h1>
            {/*///write list iteration here*/}
            <RecCard />
            <ul>
                <li>Rec 1</li>
                <li>Rec 2</li>
                <li>Rec 3</li>
            </ul>
        </div>
    );
}

export default RecList;
