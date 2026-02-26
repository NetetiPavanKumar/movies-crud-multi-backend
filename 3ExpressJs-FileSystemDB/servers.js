const express=require("express");
const cors=require("cors");
const { movies } = require("./Controllers/MovieRouteHandlers");

const app=express();
app.use(cors());
app.use(express.json());

app.listen(3001,()=>{
    console.log("Server Started Successfully at 3001....");
})


module.exports={express,app}