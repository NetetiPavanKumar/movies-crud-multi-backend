import {Link} from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
export default function HomePage({conn,setConn,backend,setBackend}){
    let navigate=useNavigate();
    const [isChecking, setIsChecking] = useState(false);
    const [notstarted, setNotStarted] = useState(true);
    function backEndHandler(port){
        localStorage.setItem('back',JSON.stringify([port]));
        setNotStarted(false);
        setIsChecking(true);
        setBackend([port]);
        setTimeout(()=>{
            setIsChecking(false);
        },5000);
    }
    return(
        <>
        <h2>Select Your Backend Environment</h2>
        <div>
            <button onClick={()=>{
                backEndHandler(8000);
            }} className={isChecking?"back-btn block-btn":backend[0]===8000?"back-btn-activate":"back-btn"}> Node.js + FS Database</button>
            <button onClick={()=>{
                backEndHandler(3001);
            }} className={isChecking?"back-btn block-btn":backend[0]===3001?"back-btn-activate":"back-btn"}>Express.js + FS Database</button>
            <button onClick={()=>{
                backEndHandler(3003);
            }} className={isChecking?"back-btn block-btn":backend[0]===3003?"back-btn-activate":"back-btn"}>Express.js + MongoDB</button>
        </div>
        <div>                  
            {
                notstarted?(<div className="not-started">Please Select a BackEnd to getting Started....</div>)
                :isChecking?(<div className="load-btn not-started">Loading....</div>)
                :conn?(<button className="get-movies-btn" onClick={()=>{
                    navigate("/movies");
                }}>Get Movies</button>)
                :(<>
                    <button className="btn-disable">Get Movies</button>
                    <div className="err-class">
                        <p>⚠️Failed to Connect to the Backend.Please Try Again....</p>
                        Also Please check if the backend server is started or not...!
                    </div>
                </>)
            }
        </div>
        </>
    )
}