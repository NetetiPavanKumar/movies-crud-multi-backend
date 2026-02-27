import {Link} from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
export default function HomePage({conn,setConn,backend,setBackend}){
    let navigate=useNavigate();
    const [isChecking, setIsChecking] = useState(false);
    const [notstarted, setNotStarted] = useState(true);
    function backEndHandler(url){
        //localStorage.setItem('back',JSON.stringify([port]));
        localStorage.setItem("back", JSON.stringify([url])); // store selected backend URL
        setNotStarted(false);
        setIsChecking(true);
        //setBackend([port]);
        setBackend([url]);
        setTimeout(()=>{
            setIsChecking(false);
        },5000);
    }

    const backends = [
    { name: "Node.js + FS Database", url: "https://movies-crud-multi-backend-node-fs.onrender.com" },
    { name: "Express.js + FS Database", url: "https://movies-crud-multi-backend-express-fs.onrender.com" },
    { name: "Express.js + MongoDB", url: "https://movies-crud-multi-backend-express-mdb.onrender.com" },
  ];
    return(
        <>
        {/* <h2>Select Your Backend Environment</h2>
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
        </div> */}


        <h2>Select Your Backend Environment</h2>
      <div>
        {backends.map((b) => (
          <button
            key={b.url}
            onClick={() => backEndHandler(b.url)}
            className={
              isChecking
                ? "back-btn block-btn"
                : localStorage.getItem("back")?.includes(b.url)
                ? "back-btn-activate"
                : "back-btn"
            }
          >
            {b.name}
          </button>
        ))}
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