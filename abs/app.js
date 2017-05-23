const port = 3000;

var express 			= require("express");
var bodyParser 		= require("body-parser");  		// https://github.com/expressjs/body-parser
var mongoose			= require("mongoose");
var methodOverride 	= require("method-override");		// https://github.com/expressjs/method-override
var User					= require("./models/user");
var profile				= require("./models/profile");
var helpers				= require("./helpers");
var app 					= express();

var indexRoutes = require("./routes/index");
var profileRoutes = require("./routes/profile");

mongoose.connect("mongodb://fangns-dev-shard-00-00-fhkfn.mongodb.net:27017,fangns-dev-shard-00-01-fhkfn.mongodb.net:27017,fangns-dev-shard-00-02-fhkfn.mongodb.net:27017/fangns-dev?ssl=true&replicaSet=fangns-dev-shard-0&authSource=admin"); //"" --ssl-username fangns --password fangns -authenticationDatabase admin

// view engine setup
app.set("view engine", "ejs");

// serves up static files from the public folder
app.use(express.static(__dirname + "/public"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(methodOverride("_method"));



app.use("/", indexRoutes);
app.use("/profiles", profileRoutes);

app.listen(port, (err) => {
	if (err) {
		return console.log("Something bad happened", err);
	}
	console.log(`Server is listening on ${port}`);
});