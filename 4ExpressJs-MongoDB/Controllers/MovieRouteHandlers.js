// const fs = require("fs");
//const { express,app } = require("../servers");

const Movie=require("../Models/movieModel.js");

// let movies=Movie.find().then(()=>{
//     console.log("hfjkk")
// });
async function getMovies(req,res){
    try{
        let movies=await Movie.find();
        res.status(200).json(movies);
    }
    catch{
        res.status(500).json("Some Internal Error");
    }
}

async function createMovie(req,res){
    try{
    await Movie.create(req.body);
    res.status(200).json("Movies created Successfully");
    }
    catch{
        res.status(400).json("Bad Request")
    }
}

async function deleteMovie(req,res){
    try{
    let delMovie=await Movie.findByIdAndDelete(req.params.id);
    if(!delMovie){
        throw new Error("Bad Request, Unable to Delete");
    }
    res.status(200).json("Movie Deleted Successfully");
    }
    catch(err){
        res.status(400).json(`Bad Request : ${err}`);
    }

}
async function updateMovie(req,res){
    try{
    let movie=await Movie.updateOne({"_id":req.params.id},{$set:req.body});
    if(movie){
    res.status(200).json("Movie Updated Succesfully");
    }
    else{
        throw new Error("Bad Request, Please check your Movie Id. Movie doesn't exists");
    }
    }
    catch(err){
        console.log("Bad Request:",err);
        res.status(400).json("Bad Request")
    }
}

module.exports={getMovies,createMovie,deleteMovie,updateMovie};