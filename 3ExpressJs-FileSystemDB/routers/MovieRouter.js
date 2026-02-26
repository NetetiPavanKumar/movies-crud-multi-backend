const {express,app} = require("../servers.js");

const router=express.Router();

app.use("/movies",router);

module.exports=router;