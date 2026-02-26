const {express,app} = require("./servers.js");
const movieRouter=require("./routers/MovieRouter.js");
const routeHandler=require("./Controllers/MovieRouteHandlers.js");
const validator=require("./Controllers/ValidateRouter.js");


// app.get("/movies",getMovie)
// app.post("/movies",createMovie)
// app.delete("/movies/:id",deleteMovie)
// app.put("/movies/:id",updateMovie)




movieRouter.route("/")
    .get(routeHandler.getMovies)
    .post(routeHandler.createMovie)
movieRouter.route("/:id")
    .delete(validator.validate,routeHandler.deleteMovie)
    .put(routeHandler.updateMovie)