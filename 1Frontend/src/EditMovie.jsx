//import UserInp from "./UserInp.jsx";
import "./UserInp.css";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
export default function EditMovie({updateMovie,setMovieName,setReleaseYear,setBudget,setCollections,movies,moviename,releaseYear,budget,collections}){
    const navigate=useNavigate();
    const {id}=useParams();
    console.log(id);
    console.log(movies);
    let sele='';
    movies.forEach((movie)=>{
        if(id===movie._id){
            sele=movie;
            console.log("Hiii from Edit")
        }
    })
    if(sele===""){
        return(
            <div>
                <h4>Enter correct Movie Id</h4>
            </div>
        )
    }
    return(
        <>
        <div className="user-inp">
            <input placeholder={sele.mname} value={moviename} className="inp-box" onChange={(event)=>{
                    setMovieName(event.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Tab" && moviename === "") {
                    e.preventDefault();              // stop normal tab
                    setMovieName(e.target.placeholder);
                }}}>
            </input>
            <input placeholder={sele.r_year} value={releaseYear} className="inp-box" onChange={(event)=>{
                    setReleaseYear(event.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === "Tab" && releaseYear === "") {
                    e.preventDefault();
                    setReleaseYear(e.target.placeholder);
                }}}></input>
            <input placeholder={sele.bud} value={budget} className="inp-box" onChange={(event)=>{
                    setBudget(event.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Tab" && budget === "") {
                    e.preventDefault();
                    setBudget(e.target.placeholder);
                }}}></input>
            <input placeholder={sele.collection} value={collections} className="inp-box" onChange={(event)=>{
                    setCollections(event.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Tab" && collections === "") {
                    e.preventDefault();
                    setCollections(e.target.placeholder);
                }}}></input>
        </div>
        <button className="add-movie-btn" onClick={()=>{
            updateMovie(id);
            navigate("/movies");
        }}>Update Movie</button>
        </>
    )
}