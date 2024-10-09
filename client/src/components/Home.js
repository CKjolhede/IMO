import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './Footer';
import Follows from "./Follows";
import EditUser from "./EditUser";
import Movies from "./Movies";
import About from "./About";
import UserProfile from "./UserProfile";
import Contact from "./Contact";
import Header from "./Header";
import RegisterContainer from "./RegisterContainer";
//import Modal from "./ProfileModal";
import LoginFormContainer from "./LoginFormContainer";
//import RecFeed from "./RecFeed";
import Recommendations from "./Recommendations";
import NotFound from "./NotFound";
import MovieSearch from "./MovieSearch";
import { useAuth } from '../contexts/AuthContext';
import { useRec } from '../contexts/RecContext';
import axios from 'axios';

function Home() {
    const { user, isLoggedIn } = useAuth();
    const { createRecommendation, removeRecommendation } = useRec();
    
    const updateUserImage = async (imageUrl) => {
        try {
            const response = await axios.patch('/users/' + user.id, { image: imageUrl });
            console.log('User image updated:', response.data);
        } catch (error) {
            console.error('Failed to update user image:', error);
        }
    };

    const handleAddRecommendation = async (movie) => {
        const tmdbId = movie.tmdb_id;
        console.log('Handle AddRecommendation movie tmdbid:', tmdbId);
        const movie_in_db = await check_movie_in_db(tmdbId, movie); 
        console.log("after checked movie in db", movie_in_db)
        if (movie_in_db.recommendations.length === 0) {
            console.log("movie has no recommendations", movie_in_db);
            createRecommendation(movie_in_db.id, user.id);
            
        } else if (movie_in_db.recommendations.some(rec => rec.user_id === user.id)) {
            return console.log(
                "movie already in db, no need to add to db argument: ",
                movie
            );
        } else {
            createRecommendation(movie_in_db.id, user.id);
        }
    };
    const check_movie_in_db = async function (tmdb_id, movie) {
        console.log("check_movie_in_db: ", tmdb_id, movie);
        const response = await fetch("/movies/tmdb/" + tmdb_id, { method: 'GET' });
        if (response.ok && response !== false) {
            const data = await response.json();
            console.log("movie checked and in db", data);
            return (data);     
        } else {
            return await addMovieToDb(movie);
        }
    } 
    
    const addMovieToDb = async (movie) => {
        try {
            console.log("addMovieToDb: ", movie);
        const newmovie = await fetch("/movies", {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                tmdb_id: movie.tmdb_id,
                title: movie.title,
                release_date: movie.release_date,
                backdrop_path: movie.backdrop_path,
                overview: movie.overview,
                poster_path: movie.poster_path,
                rating: movie.vote_average
            }),
        });
            console.log("newMovieaddedtoDB: ", newmovie);
        if (newmovie.ok) {
            return await newmovie.json();
            } 
        } catch (error) { console.error("Failed to add movie", error); }
        };
    
    // fetching friends of User
    
    
    
    return (
            <>
            <Header />
            {isLoggedIn ? (

            <div className="home">
                <div className="home-content">
                        <Routes>
                            {/*<Route path="/" />*/}
                            {/*<Route path="home/*" element={<UserProfile updateUserImage={updateUserImage}/>} />*/}
                            <Route path="follows" element={<Follows />} />
                            <Route path="edituser" element={<EditUser updateUserImage={updateUserImage} />} />
                            <Route path="moviesearch" element={<MovieSearch handleAddRecommendation={handleAddRecommendation} removeRecommendation={removeRecommendation} />} />
                            <Route path="movies" element={<Movies handleAddRecommendation={handleAddRecommendation} removeRecommendation={removeRecommendation} />} />
                            <Route path="about" element={<About />} />
                            <Route path="contact" element={<Contact />} />
                            <Route path="userprofile/*" element={<UserProfile updateUserImage={updateUserImage} />} />
                            <Route path="/Recommendations" element={<Recommendations />} />
                            {<Route path="*" element={<NotFound />} />}
                    </Routes>    
                </div>
                <Footer className="footer" />
                </div>
            ) : (
                    <>
                    <Routes>
                            
                        {/*<Route path="/*" element={<NotFound />} />*/}
                        <Route
                            exact path="/loginformcontainer"
                            element={<LoginFormContainer />}
                        />
                        <Route
                            path="/registercontainer"
                            element={<RegisterContainer />}
                        />
                        </Routes>
                        <LoginFormContainer />
                </>
            )}
            </>
    );
    };

export default Home;
    
    //const [recommendations, setRecommendations] = useState([]);
    
    //const removeRecommendation = async (rec_id,) => {
    //    try {
    //        const response = await fetch("/recommendations/" + rec_id, { method: "DELETE" });
    //        if (response.ok) {
    //            setRecommendations(recommendations.filter((r) => r.id !== rec_id));
    //        }
    //    }
    //    catch (error) {
    //        console.error("Failed to remove recommendation", error);
    //    }
    //};


    //const createRecommendation = async (movie_id, user_id) => {
    //    const response = await fetch("/recommendations", {
    //        method: "POST",
    //        headers: { "Content-Type": "application/json" },
    //        body: JSON.stringify({
    //            movie_id: movie_id,
    //            user_id: user_id
    //        }),
    //    });
    //    if (!response.ok) {
    //        throw new Error(`HTTP error! status: ${response.status}`);
    //    }
    //    else {
    //        const data = await response.json();
    //        setRecommendations([data, ...recommendations]);
    //    }
    //}
//=> {
            //const newmovie = async ()await fetch("/movies", {
            //    method: "POST",
            //    headers: { "Content-Type": "application/json" },
            //    body: JSON.stringify({
            //        tmdb_id: movie.tmdb_id,
            //        title: movie.title,
            //        release_date: movie.release_date,
            //        backdrop_path: movie.backdrop_path,
            //        overview: movie.overview,
            //        poster_path: movie.poster_path
            //    }),
            //});
            //if (!newmovie.ok) {
            //    throw new Error(`HTTP error! status: ${newmovie.status}`);
            //} else {
        //    const new_movie = await newmovie.json();
        
        
        //useEffect(() => {
        //    const fetchRecommendations = async () => {
        //        try {
        //            const response = await fetch("/recommendations/" + user.id, {
        //                method: "GET",
        //            });
        //            if (response.ok) {
        //                const data = await response.json();
        //                setRecommendations(data);
        //            }
        //        } catch (error) {
        //            console.error("Unable to fetch recommendations:", error);
        //        }
        //    };
        //    fetchRecommendations();
        //}, [user.id]);