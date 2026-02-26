const mongoose=require("mongoose");
const movieSchema=new mongoose.Schema({
    "_id":{
        type:String,
        required:[true,"Id Field is required"],
    },
    "mname":{
        type:String,
        required:[true,"Movie Name Filed is Required"]
    },
    "r_year":Number,
    "bud":{
        type:Number,
        required:[true,"Budget Filed is Required"]
    },
    "collection":{
        type:Number,
        required:[true,"Collection Filed is Required"]
    },
})

const Movie=mongoose.model('MovieCollection',movieSchema);

module.exports=Movie;