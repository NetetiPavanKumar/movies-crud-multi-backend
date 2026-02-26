const fs=require("fs");
const http=require("http");
const { json } = require("stream/consumers");
const url=require("url");

const server=http.createServer((req,res)=>{
    let url1=req.url;
    let movies=fs.readFileSync("./movies-list.js","utf-8");

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");


    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }
    switch(req.method){
        case "GET":
            if(url1==="/movies"){
                res.writeHead(200,{"Content-Type":"application/json"});
                res.end(movies);
            }
            else{
                res.writeHead(404,"Content-Type:application/json");
                res.end("Page not Found");
            }
            break;
        case "POST":
            if(url1==="/movies"){
                let body=""
                req.on("data",(chunk)=>{
                    body+=chunk;
                })
                req.on("end",()=>{
                let movies1=JSON.parse(movies);
                // console.log(typeof movies1)
                // console.log(body)
                movies1.push(JSON.parse(body))
                fs.writeFileSync('./movies-list.js', JSON.stringify(movies1),"utf-8");
                res.writeHead(200,'Content-Type:application/json');
                res.end("Created a Movie succesfully");
                })
            }
            else{
                res.writeHead(404,"Content-Type:application/json");
                res.end("Page not Found");
            }
            break;
        case "DELETE":
            const urlar=url1.split("/");
            const path=urlar[1];
            const id=urlar[2];
            //const {query,pathname:path}=url.parse(req.url,true)
            // console.log("Path:",path);
            // console.log("ID:",query.mid);
            if(path==="movies"){
                let movies1=JSON.parse(movies)
                let movie="";
                let ind=0;
                movies1.forEach((sele,index)=>{
                    //console.log("Movie ID:",movie._id);
                    if(sele._id===id){
                        movie=sele;
                        ind=index;
                    }
                })
                if(movie!=""){
                    movies1.splice(ind,1);
                    console.log("Movies after deletion:",ind);
                    fs.writeFileSync("./movies-list.js",JSON.stringify(movies1),"utf-8");
                    res.writeHead(200,'Content-Type:application/json');
                    res.end("Movie Deleted Successfully");
                }
            }
            else{
                res.writeHead(404,"Content-Type:application/json");
                res.end("Page not Found");
            }
            break;
        case "PUT":
            // console.log(url.parse(req.url,true));
            // const {query:query1,pathname:path1}=url.parse(req.url,true);
            //console.log(url1);
            const urlarr=url1.split("/");
            const path1=urlarr[1];
            const mid=urlarr[2];
            console.log(path1,mid)
            if(path1==="movies"){
                console.log("Hiii from PUT");
                let body="";
                req.on("data",(chunk)=>{
                    body+=chunk;
                })
                req.on("end",()=>{
                console.log("Hiii from PUT END");
                let movies1=JSON.parse(movies);
                let movie="";
                let ind=0;  
                console.log(typeof movies1);
                movies1.forEach((sele,index)=>{
                    //console.log("Movie ID:",movie._id);
                    if(sele._id===mid){
                        movie=sele;
                        ind=index;
                    }
                })
                if(movie===""){
                    res.writeHead(404,"Content-Type:application/json");
                    res.end(`Bad request,movie with id ${mid} is not found.`);
                }

                console.log(body);
                body=JSON.parse(body)
                let upmovie=Object.assign({...movie,...body});
                movies1[ind]=upmovie;
                fs.writeFileSync("./movies-list.js",JSON.stringify(movies1),"utf-8");
                res.writeHead(200,'Content-Type:application/json');
                res.end("Updated Succesfully");
            })
            }
            else{
                res.writeHead(404,"Content-Type:application/json");
                res.end("Page not Found");
            }
            break;
        default:
            res.writeHead(400,"Content-Type:application/json");
            res.end("Bad request");

    }
})
server.listen('8000',()=>{
    console.log("Server Started at 8000....")
})