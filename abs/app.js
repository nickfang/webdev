const port = 3000;

var express 			= require("express");
var bodyParser 		= require("body-parser");
var methodOverride 	= require("method-override");
var User					= require("./models/user");
var profile				= require("./models/profile");
var app 					= express();

var indexRoutes = require("./routes/index");
var profileRoutes = require("./routes/profile");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
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