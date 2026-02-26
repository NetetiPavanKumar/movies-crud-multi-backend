const {movies}=require("./MovieRouteHandlers.js");

function validate(req,res,next){
    let id=req.params.id;
    console.log(req.params);
    let sele="";
    let ind=-1;
    movies.forEach((movie,index)=>{
        if(movie._id===id){
            sele=movie;
            ind=index;
        }
    })
    if(ind==-1 && sele==""){
        res.status(500).json("Movie not found, Please Try Again....");
        return;
    }
    next();
}
module.exports={validate};