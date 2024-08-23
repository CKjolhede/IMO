import React from 'react';
import { Routes, Route} from 'react-router-dom';
import SideBar from './SideBar';
import Follows from "./Follows";
import EditUser from "./EditUser";
import Movies from "./Movies";
import About from "./About";
import UserProfile from "./UserProfile";
import Contact from "./Contact";
import Recommendations from "./Recommendations";
import MovieSearch from "./MovieSearch";
import { useAuth } from '../contexts/AuthContext';
import { useRec } from '../contexts/RecContext';


function Home() {
    const { user } = useAuth();
    const { recommendations, createRecommendation, removeRecommendation } = useRec();
    
    
    const check_movie_in_db = async function (tmdb_id) {
        const response = await fetch("/movies/tmdb/" + tmdb_id, { method: 'GET' });
        if (response.ok) {
            const data = await response.json();
            console.log("check movie in db", data)
            return data;        
        } else { return false; }
    }   
    const addMovieToDb = async (movie) => {
        try {
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
        if (newmovie.ok) {
            return await newmovie.json();
            } 
        } catch (error) { console.error("Failed to add movie", error); }
        };
    
    const handleAddRecommendation = async (movie) => {
        const tmdbId = movie.tmdb_id;
        const movie_in_db = await check_movie_in_db(tmdbId);
        if (movie_in_db && (movie_in_db.recommendations.length === (0 || movie_in_db.recommendations.filter((recommendation) => recommendation.user_id !== user.id).length)))
            {
                createRecommendation(movie.id, user.id);
            }
        
        else { 
            const new_movie = await addMovieToDb(movie);            
            createRecommendation(new_movie.id, user.id);
        }
        };
    
        return (
            <div className="home">
                <div className="home-sidebar">
                    <SideBar />
                </div>
                <div className="home-content">
                    <Routes>
                        <Route path="follows" element={<Follows />} />
                        <Route path="edituser" element={<EditUser />} />
                        <Route path="moviesearch" element={<MovieSearch handleAddRecommendation={handleAddRecommendation} removeRecommendation={removeRecommendation} />} />
                        <Route path="movies" element={<Movies handleAddRecommendation={handleAddRecommendation} removeRecommendation={removeRecommendation} />} />
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="userprofile" element={<UserProfile />} />
                        <Route path="recommendations" element={<Recommendations  />} />
                    </Routes>
                </div>
            </div>
        );
    };

export default Home;
    
    //const [recommendations, setRecommendations] = useState([]);
    //console.log("home recommendations", recommendations);
    
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
        //                console.log("fetched recommendations", data);
        //                setRecommendations(data);
        //            }
        //        } catch (error) {
        //            console.error("Unable to fetch recommendations:", error);
        //        }
        //    };
        //    fetchRecommendations();
        //}, [user.id]);