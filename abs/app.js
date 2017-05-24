// const port = 3000;

var express 			= require("express");
var bodyParser 		= require("body-parser");  		// https://github.com/expressjs/body-parser
var mongoose			= require("mongoose");
var methodOverride 	= require("method-override");		// https://github.com/expressjs/method-override
var User					= require("./models/user");
var profile				= require("./models/profile");
var indexRoutes 		= require("./routes/index");
var profileRoutes 	= require("./routes/profile");
var helpers				= require("./helpers");

var app 					= express();

// view engine setup
app.set("view engine", "ejs");

// serves up static files from the public folder
app.use(express.static(__dirname + "/public"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));

// Routes
app.use("/", indexRoutes);
app.use("/profiles", profileRoutes);

module.exports = app;