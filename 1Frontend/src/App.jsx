import {BrowserRouter,Routes,Route} from "react-router-dom";
import { useEffect,useState } from "react";
import EditMovie from "./EditMovie.jsx";
import HomePage from "./HomePage.jsx";
import MoviePage from "./MoviePage.jsx";
import axios from "axios";

export default function App(){
    const [movies,setMovies]=useState([]);
    const [moviename,setMovieName]=useState('');
    const [releaseYear,setReleaseYear]=useState('');
    const [budget,setBudget] = useState('');
    const [collections,setCollections]=useState('');
    //const [backend,setBackend]=useState([0]);
    const [conn,setConn]=useState(false)
    const [backendarr, setBackend] = useState([localStorage.getItem("back") ? JSON.parse(localStorage.getItem("back"))[0] : ""]);

    //let backendarr=JSON.parse(localStorage.getItem('back')) || backend;

    console.log(backendarr);

    async function loadMovies(){


        // axios.get("http://localhost:8000/movies").then((response)=>{
        //         // console.log(response)
        //         // console.log("Hiii I got movies");
        //         return response.data;
        //         }).then((moviedata)=>{
        //             //console.log(movies)
        //             setMovies(moviedata)
        //         }).catch(()=>{
        //             console.log("Faild to load movies");
        //         })


        // try{
        // const response=await axios.get('http://localhost:3001/movies');
        // setMovies(response.data);
        // }
        // catch(err){
        //     console.log("Error : Failed to load Movies",err);
        // }


        try{
        const port=backendarr[0];
        //const response=await axios.get(`http://localhost:${port}/movies`);
        const response=await axios.get(`${port}/movies`);
        setMovies(response.data);
        return true;
        }
        catch(err){
            console.log("Error : Failed to load Movies",err);
            return false;
        }
    }
    function clearAllValue(){
        setMovieName('');
        setBudget('');
        setReleaseYear('');
        setCollections('');
    }
    async function savetoStorage(){


        // axios.post("http://localhost:8000/updmovies",
        //     {
        //         _id:crypto.randomUUID(),
        //         mname:moviename,
        //         r_year:releaseYear,
        //         bud:budget,
        //         collection:collections
        //     }).then((response)=>{
        //         console.log(response)
        //     }).then(()=>{
        //         clearAllValue();
        //         loadMovies();
        //     }).catch(()=>{
        //         console.log("Failed to save");
        //     })


        // try{
        // await axios.post("http://localhost:3001/movies",{
        //     _id:crypto.randomUUID(),
        //     mname:moviename,
        //     r_year:releaseYear,
        //     bud:budget,
        //     collection:collections
        // })
        // clearAllValue();
        // await loadMovies();


        try{
        const port=backendarr[0];
        // await axios.post(`http://localhost:${port}/movies`,{
        //     _id:crypto.randomUUID(),
        //     mname:moviename,
        //     r_year:releaseYear,
        //     bud:budget,
        //     collection:collections
        // })
        await axios.post(`${port}/movies`,{
            _id:crypto.randomUUID(),
            mname:moviename,
            r_year:releaseYear,
            bud:budget,
            collection:collections
        })
        clearAllValue();
        await loadMovies();
    }
    catch(err){
        console.log("Error: Cannot Add Movie",err);
    }
    }
    async function updateMovie(mid){


        // axios.put(`http://localhost:8000/editmovies/?mid=${mid}`,{
        //     mname:moviename,
        //     r_year:releaseYear,
        //     bud:budget,
        //     collection:collections
        // }).then((response)=>{
        //         clearAllValue();
        //         loadMovies();
        // }).catch((err)=>{
        //     console.log("Error: You are trying to update a movie which is not existing on db.", err);
        // })



        // try{
        //     await axios.put(`http://localhost:3001/movies/${mid}`,{
        //         mname:moviename,
        //         r_year:releaseYear,
        //         bud:budget,
        //         collection:collections
        //     });
        //     await loadMovies();
        // }



        try{
            const port=backendarr[0];
            // await axios.put(`http://localhost:${port}/movies/${mid}`,{
            //     mname:moviename,
            //     r_year:releaseYear,
            //     bud:budget,
            //     collection:collections
            // });

            await axios.put(`${port}/movies/${mid}`,{
                mname:moviename,
                r_year:releaseYear,
                bud:budget,
                collection:collections
            });

            await loadMovies();
        }
        catch(err){
        console.log("Error: Cannot Update Movie",err);
        }
        clearAllValue();
    }

    async function callme(){
            const conn =await loadMovies();
            setConn(conn);
        }
    useEffect(()=>{
        callme();
    },backendarr)


return(
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element = {<HomePage conn={conn} setConn={setConn} setBackend={setBackend}/>}></Route>
            <Route path="/movies" element={<MoviePage backendar={backendarr} loadMovies={loadMovies} savetoStorage={savetoStorage} setMovies={setMovies} setMovieName={setMovieName} setBudget={setBudget} setCollections={setCollections} setReleaseYear={setReleaseYear} movies={movies} moviename={moviename} releaseYear={releaseYear} budget={budget} collections={collections} />}></Route>
            <Route path={`editmovie/:id`} element={<EditMovie updateMovie={updateMovie} savetoStorage={savetoStorage} setMovies={setMovies} setMovieName={setMovieName} setBudget={setBudget} setCollections={setCollections} setReleaseYear={setReleaseYear} movies={movies} moviename={moviename} releaseYear={releaseYear} budget={budget} collections={collections} />}></Route>
        </Routes>
    </BrowserRouter>
    </>
);
}