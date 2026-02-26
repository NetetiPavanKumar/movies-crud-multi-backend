const env =require("dotenv");
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first'); 
env.config();
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const { movies } = require("./Controllers/MovieRouteHandlers");

const app=express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT,()=>{
    console.log(`Server Started Successfully at ${process.env.PORT}....`);
})


mongoose.connect(process.env.ATLAS_CONN_STR,{
    serverSelectionTimeoutMS: 10000
  }).then(() => {console.log("MongoDB connected");
  })
  .catch(err => console.error(err))


module.exports={express,app}