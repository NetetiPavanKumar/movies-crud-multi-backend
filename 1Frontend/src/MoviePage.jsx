import axios from "axios";
import "./MoviePage.css"
import { Fragment, useEffect,useState } from "react";
import UserInp from "./UserInp";
import EditMovie from "./EditMovie";
import {Link, Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function MoviePage({loadMovies,savetoStorage,movies,setMovieName,setReleaseYear,setBudget,setCollections,moviename,releaseYear,budget,collections}){
    let backendarr=JSON.parse(localStorage.getItem('back'));
    let navigate=useNavigate();
    async function deleteMovie(m_id){
        // axios.delete(`http://localhost:8000/movies/${m_id}`).then((response)=>{
        //     console.log(response.data);
        // }).then(()=>{
        //     loadMovies();
        // }).then(()=>{
        //     console.log("Movies list:",movies)
        // })

        
        // try{
        // await axios.delete(`http://localhost:3001/movies/${m_id}`);
        // await loadMovies();
        // }

        try{
        const port=backendarr[0];
        console.log(port)
        await axios.delete(`http://localhost:${port}/movies/${m_id}`);
        await loadMovies();
        }
        catch(err){
            console.log("Error Occured :",err)
        }
    }

    return(
    <>
        <h2 className="dot">
            You are connected to {
                backendarr[0] === 8000 ? "Node.js + FS Database" : 
                backendarr[0] === 3001 ? "Express.js + FS Database" : 
                backendarr[0] === 3003 ? "Express.js + MongoDB" : 
                "Unknown Backend"
            }
        </h2>
        <button onClick={()=>{
            navigate("/")
        }} className="change-back-btn">Change BackEnd</button>
        <div className = "movies-box">
            {
                movies.map((movie)=>{
                    let hitStatus;
                    if(Number(movie.collection)>Number(movie.bud)){
                        hitStatus="Hit";
                    }
                    else{
                        hitStatus="Flop";
                    }
                    return (
                    <Fragment key={movie._id}>   
                    <div className="movie-box">
                        <h2>Movie Name: {movie.mname}</h2>
                        <h3>Movie Release Year : {movie.r_year}</h3>
                        <h4>Movie Hit or Flop: {hitStatus}</h4>
                        <button className="delete-btn" onClick={()=>{
                            deleteMovie(movie._id);
                        }}>Delete</button>
                        <Link to={`/editmovie/${movie._id}`} className="edit-btn">Edit</Link>
                    </div>
                    </Fragment>
                )
                })
            }
        </div>

        <UserInp setMovieName={setMovieName} setBudget={setBudget} setCollections={setCollections} setReleaseYear={setReleaseYear} movies={movies} moviename={moviename} releaseYear={releaseYear} budget={budget} collections={collections} />
        <button className="add-movie-btn" onClick={()=>{
            savetoStorage();
        }}>Add Movie</button>
    </>
    )
}