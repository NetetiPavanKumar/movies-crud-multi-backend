const fs = require("fs");
//const { express,app } = require("../servers");


let movies=JSON.parse(fs.readFileSync("./movies-list.js","utf-8"));

function getMovies(req,res){
res.status(200).json(movies);
}

function createMovie(req,res){
    let newMovie=req.body;
    movies.push(newMovie);
    fs.writeFile("./movies-list.js",JSON.stringify(movies),"utf-8",(err)=>{
        if(!err){
        res.status(200).json("Movie Created");
        }
        else{
            res.status(500).json("Unable to Create Movie, Please Try Again....");
        }
    });
    
}

function deleteMovie(req,res){
    let id=req.params.id;
    movies.forEach((movie,index)=>{
        if(movie._id===id){
            sele=movie;
            ind=index;
        }
    })
    movies.splice(ind,1);
    fs.writeFile("./movies-list.js",JSON.stringify(movies),"utf-8",(err)=>{
        if(!err){
            res.status(200).json("Movie Deleted");
            return;
        }
        else{
            res.status(500).json("Unable to Delete Movie, Please Try Again....");
        }
    })
}
function updateMovie(req,res){
    let id=req.params.id;
    let body=req.body;
    movies.forEach((movie,index)=>{
        if(movie._id===id){
            sele=movie;
            ind=index;
        }
    })
    let updMovie=Object.assign({...sele,...body});
    console.log(updMovie);
    movies[ind]=updMovie;
    fs.writeFile("./movies-list.js",JSON.stringify(movies),"utf-8",(err)=>{
        if(!err){
            res.status(200).json("Movie Updated");
            return;
        }
        else{
            res.status(500).json("Unable to Update Movie, Please Try Again....");
        }
    })
}

module.exports={getMovies,createMovie,deleteMovie,updateMovie,movies};