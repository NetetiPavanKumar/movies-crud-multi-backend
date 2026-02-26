import { useState } from "react";
import "./UserInp.css"
export default function UserInp({setMovieName,setReleaseYear,setBudget,setCollections,moviename,releaseYear,budget,collections}){
    return(
        <div className="user-inp">
            <input placeholder="Enter Movie Name" value={moviename} className="inp-box" onChange={(event)=>{
                setMovieName(event.target.value);
            }}></input>
            <input placeholder="Movie Release Year" value={releaseYear} className="inp-box" onChange={(event)=>{
                setReleaseYear(event.target.value)
            }}></input>
            <input placeholder="Budget" value={budget} className="inp-box" onChange={(event)=>{
                setBudget(event.target.value);
            }}></input>
            <input placeholder="Collections" value={collections} className="inp-box" onChange={(event)=>{
                setCollections(event.target.value);
            }}></input>
        </div>
    )
}